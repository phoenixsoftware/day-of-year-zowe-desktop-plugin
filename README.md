This program and the accompanying materials are
made available under the terms of the Eclipse Public License v2.0 which accompanies
this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

SPDX-License-Identifier: EPL-2.0

Copyright Contributors to the Zowe Project.
# Day of Year Zowe Plug-in (UPDATED 9/10/23)
This sample app was update for the 2023 Open Mainframe Summit in Las Vegas for the presentation titled Demystified: Put Your Web App on the Zowe Desktop in a Flash UPDATED. (It is included in this repository.) The orginal presentation (below) was modified into an "everything you need to know to modify a web app and install it as a Zowe iframe app" presentation.  As far as the repo is concerned, I removed a few extraneous files, updated the metadata files to 2.10 level so they match the presentation, and added the schemas directory which, starting in LTS 2.3, was required to be able to install.  Now that you have the repository cloned, you can use the **zwe components install** command to install it with no modification.

# Day of Year Zowe Plug-in
This sample app was created for the 2022 Open Mainframe Summit in Philidelphia for the presentation titled Demystified: Put Your Web App on the Zowe Desktop in a Flash.  It was created following the instructions in the presentation to modify the v2.0 Zowe Iframe Sample App, merging in the [@phoenixsoftware/day-of-year-web-app GitHub project](https://github.com/phoenixsoftware/day-of-year-web-app).

This app can likely be installed directly under v1.27 LTS of Zowe, but hasn't been tested.  The install procedure uses a shell script that can be found in the bin directory that is a subdirectory of the instance directory.  The instance directory can be found on the INSTANCE= parameter in the ZWESVSTC job.  The syntax is: 

`./install.app.sh` *path-to-plugin*

**Note: This App requires the [Sample Angular App](https://github.com/zowe/sample-angular-app) to be installed.**  This comes pre-installed in version 1.x of Zowe.  In version 2.x, it is pre-loaded but not installed.  This command will install it on v2.x (see step 6 below for further explanation):

 `zwe components install -c` *path-to-zowe.yaml* `-o runtimeDirectory/components/app-server/share/sample-angular-app`. 
 
 Alternatively, you can remove the dataServices property from the pluginDefinition.json file.  The JavaScript referencing this functionality, though included, is not exercized and should not cause errors.

**Note from the Zowe Team: This App intentionally does not follow the typical dev layout of directories and content described in [the Zowe wiki](https://github.com/zowe/zlux/wiki/ZLUX-App-filesystem-structure) in order to demonstrate that you can include content within the ZLUX framework that was not intended for ZLUX originally.**

# Instructions
1. Clone the project into the same filesystem accessed by Zowe, or copy the cloned files and directory tree into that filesystem.  You do not need the .git directory or .git files, .ppf, sonar files, dco signoffs, or .md files if you wish to save space.  None effect your installation of the plug-in.

2. Because Zowe is not EBCDIC and the mainframe Linux for Z makes codepage assumptions, you must tag all your files iso8859-1, except for the icon.png file that needs to be tagged binary.  Issue these commands in the root of the project on the Linux for Z filesystem:

    `chtag -R -t -c iso8859-1 *`

    `chtag -b web/assets/*.png`

    `ls -R -laT`

3. This Day of Year plug-in is configured with *my-first-app* as the unique application ID and title.  You can change these values if you desire, as described in the presentation.  If you don't have access to the presentation, the various properties can be searched for in the Zowe online documentation.

4. Change directory to *runtimeDirectory*/bin, the directory that has the zwe command file.

5. If you do not know where the *runtimeDirectory* is, find the ZWESLSTC job and look for the CONFIG= parameter.  This tells you where the zowe.yaml file is located in the zowe-accessible filesystem.  The contents of the yaml file include the definition for *runtimeDirectory*.  In the next instruction, you will need this path to install your zowe plug-in.

6. Install your plug-in by issuing: 

     `zwe components install -c` *path-to-zowe.yaml* `-o` *path-to-plugin-root*

    Ensure you have the proper authority to issue this command, or it will fail.

7. Cycle the ZWESLSTC job.  When it comes up again, **My First APP** will display in the Zowe desktop start menu.  After this restart, you can change all the web app files, save them, then use the refresh button on the Zowe desktop to force reloading of the changes.  You can debug your webapp using the browser debugger.  Your web app will be found in one of the webpack folders, so look until you find it.  Only if you need to change the manifest.yaml or pluginDefinition.json file will you need to cycle the ZWESLSTC job again.

**Note**: There is no unistall command as of version 2.2 of Zowe (although there is one for version 1.x).  Refer to the presentation or contact the Zowe team on the zowe-dev channel for more information.s
# Legal
This program and the accompanying materials are
made available under the terms of the Eclipse Public License v2.0 which accompanies
this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

SPDX-License-Identifier: EPL-2.0

Copyright Contributors to the Zowe Project.
