//#tool nuget:?package=NUnit.ConsoleRunner&version=3.4.0
#tool nuget:?package=GitVersion.CommandLine
#addin nuget:?package=Cake.Incubator
#tool "nuget:?package=OctopusTools"
#addin nuget:?package=SharpZipLib
#addin nuget:?package=Cake.Compression
#addin "Cake.Npm"
#addin "Cake.FileHelpers"

//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");


//////////////////////////////////////////////////////////////////////
// PREPARATION
//////////////////////////////////////////////////////////////////////

// Define directories and variables

//Taken from https://stackoverflow.com/questions/47344636/cake-build-angular-application-to-deploy-to-azure
FilePath        ngPath      = Context.Tools.Resolve("ng.cmd");
FilePath        npmPath     = Context.Tools.Resolve("npm.cmd");


// Define project metadata properties.
var projectOwners = "Stony Brook University";
var projectName = "Unity Pattern Lab (Gulp Edition)";
var projectDir = "./src/Unity.PatternLab.Web";
var projectWebAppArtifactName = "Unity.PatternLab.Web";
var projectDistArtifactName = "Unity.PatternLab.Dist";

var projectDescription = "The PatternLab Web App for Unity";
var copyright = string.Format("Copyright (c) {0} Stony Brook University.  All rights reserved.", DateTime.Now.Year);


// Get/set version information.
var versionInfo = GitVersion();

var buildNumber = Bamboo.Environment.Build.Number.ToString();

Information("Build Number: {0}", buildNumber);

var buildNumberPadded = Bamboo.Environment.Build.Number.ToString("00000");
var isBuildSystemBuild = BuildSystem.IsRunningOnBamboo;

var deploymentServer =  Argument("OCTO_SERVER", ""); 
var deploymentApiKey = Argument("OCTO_KEY", "");

//only the following branches will be released to octopus
string[] releasableBranches = { "develop", "release", "hotfix", "support", "master", "default"};
var shouldCreateRelease = (releasableBranches.Any(versionInfo.BranchName.ToString().ToLower().StartsWith));

//If we are running on the build server then the octopus deploy details are available as environment variables instead of being passed in. 
if(isBuildSystemBuild) {
    Information("---Running on Bamboo Build Server---");
    
    if(deploymentServer == "") {
        deploymentServer = EnvironmentVariable("bamboo_OCTO_SERVER") ?? "";
    }
    
    if(deploymentApiKey == "" ) {
        deploymentApiKey = EnvironmentVariable("bamboo_OCTO_KEY") ?? "";
    }
}

var assemblyInformationalVersion = versionInfo.InformationalVersion;
var semanticVersion = versionInfo.FullSemVer;

var buildDir = Directory(projectDir + "/public/");
var publishWebAppDir = Directory("./publish/web-app");
var publishDistributableDir = Directory("./publish/distributable");

string[] distFolders = { "css", "fonts", "js", "images"};
//This is directory where we will save zip file of build artifact
var artifactDir = Directory("./artifacts");



var webAppZipArchivePath = MakeAbsolute(artifactDir).FullPath + "/" + projectWebAppArtifactName + "." + semanticVersion + ".zip";
var distZipArchivePath = MakeAbsolute(artifactDir).FullPath + "/" + projectDistArtifactName + "." + semanticVersion + ".zip";


//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////


Task("Clean")
    .Does(() =>
    {
        //CleanDirectory(ngOutputPath);
        CleanDirectory(buildDir);
        CleanDirectory(publishWebAppDir);
        CleanDirectory(publishDistributableDir);
        CleanDirectory(artifactDir);
    });

Task("Version")
    .IsDependentOn("Clean")
    .Does(() => 
    {
        Information("Is Build System Build: {0}", isBuildSystemBuild);

        Information("Build Number: {0}", buildNumber);

        //Information("NuGet Version: {0}", nugetPackageVersion);
        Information("VCS Revision: {0}", versionInfo.Sha);
        Information("VCS Branch Name: {0}", versionInfo.BranchName);
        Information("Is Releasable Branch? {0}", shouldCreateRelease);

        Information("GitVersion Info:\r\n{0}", versionInfo.Dump());

    });

Task("Restore-NPM-Packages")
    .IsDependentOn("Clean")
    .Does(() => {
        var settings = new NpmInstallSettings();

        settings.LogLevel = NpmLogLevel.Verbose;
        settings.WorkingDirectory = projectDir + "/";
        settings.Production = false;
        
        Information("Running NPM Install");


        NpmInstall(settings);
    });

Task("Build-PatternLab")
    .IsDependentOn("Restore-NPM-Packages")
    .Does(() =>
    {
        var runSettings = new NpmRunScriptSettings {
        ScriptName = "build",
        WorkingDirectory = projectDir + "/",
        LogLevel = NpmLogLevel.Error
    };

    NpmRunScript(runSettings);

    Information("pattern lab build complete");
        
    });


    Task("PublishWebApp")
    .IsDependentOn("Build-PatternLab")
    .Does(() =>
    {
        Information("-----Copying Web App Files for Publication-----");
        
        Information("Copying Files from {0} and putting {1}", buildDir, publishWebAppDir);

        CopyDirectory(buildDir, publishWebAppDir);
    });

        Task("PublishDistributable")
    .IsDependentOn("PublishWebApp")
    .Does(() =>
    {
        Information("-----Copying Distributable Files for Publication-----");
        
        foreach(string sDir in distFolders) {
            Information("Copying Files from {0} and putting {1}", MakeAbsolute(buildDir).FullPath + "/" + sDir, MakeAbsolute(publishDistributableDir).FullPath + "/" + sDir);
            CopyDirectory(MakeAbsolute(buildDir).FullPath + "/" + sDir, MakeAbsolute(publishDistributableDir).FullPath + "/" + sDir);  
        }
        
    });


Task("Pack")
    .IsDependentOn("PublishDistributable")
    .Does(() =>
    {
        Information("-----Packing Files for Deployment-----");
        

        Information("Making artifact from {0} and putting {1}", publishWebAppDir, webAppZipArchivePath);

        ZipCompress(publishWebAppDir, webAppZipArchivePath);

        Information("Making artifact from {0} and putting {1}", publishDistributableDir, distZipArchivePath);

        ZipCompress(publishDistributableDir, distZipArchivePath);
    });


Task("OctoPush")
    .IsDependentOn("Pack")
    .Does(() =>
    {

        if(!shouldCreateRelease) {
            Information("***Branch {0} Isn't Releasable Not Pushing To Octopus***", versionInfo.BranchName);
        }
        else if(deploymentApiKey == "" || deploymentServer == "") {
            Information("***Octopus Deployment Server or Key Not Specified***");
        }
        else { //if(shouldCreateRelease && deploymentApiKey != "" && deploymentServer != "") {
            
            Information("-----Pushing to Octopus----");
            
            OctoPush(deploymentServer, deploymentApiKey, new FilePath(webAppZipArchivePath),
                new OctopusPushSettings {
                    ReplaceExisting = true
                }
            );
        }
    });


Task("OctoRelease")
    .IsDependentOn("OctoPush")
    .Does(() =>
    {

        if(!shouldCreateRelease) {
            Information("***Branch {0} Isn't Releasable Not Releasing To Octopus***", versionInfo.BranchName);
        }
        else if(deploymentApiKey == "" || deploymentServer == "") {
            Information("***Octopus Deployment Server or Key Not Specified***");
        }
        else {
            Information("-----Releasing to Octopus----");

            OctoCreateRelease(projectName, new CreateReleaseSettings {
                Server = deploymentServer,
                ApiKey = deploymentApiKey,
                ReleaseNumber = semanticVersion
            });
        }
    });


//////////////////////////////////////////////////////////////////////
// TASK TARGETS
//////////////////////////////////////////////////////////////////////

Task("Default")
    .IsDependentOn("OctoRelease");

//////////////////////////////////////////////////////////////////////
// EXECUTION
//////////////////////////////////////////////////////////////////////

RunTarget(target);