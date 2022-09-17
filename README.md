This program and the accompanying materials are
made available under the terms of the Eclipse Public License v2.0 which accompanies
this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

SPDX-License-Identifier: EPL-2.0

Copyright Contributors to the Zowe Project.
# Day of Year Zowe Plug-in
This sample app was created for the 2022 Open Mainframe Summit for the presentation titled Demystified: Put Your Web App on the Zowe Desktop in a Flash.  It was created following the instructions in the presentation to modify the v2.0 Zowe Iframe Sample App, merging in the [@phoenixsoftware/day-of-year-web-app GitHub project](https://github.com/phoenixsoftware/day-of-year-web-app).

This app can likely be installed directly under v1.27 LTS of Zowe, but hasn't been tested.

**Note: This App requires the [Sample Angular App](https://github.com/zowe/sample-angular-app) to be installed.**  This comes pre-installed in v1.x of Zowe.  In version 2.x, it is pre-loaded but not installed.  This command will install it on v2.x (see step 5 below for further explanation):

 `zwe components install -c` *path-to-zowe.yaml* `-o runtimeDirectory/components/app-server/share/sample-angular-app`. 
 
 Alternatively, you can remove the dataServices property from the pluginDefinition.json file.  The JavaScript referencing this functionality, though included, is not excersized.

**Note: This App intentionally does not follow the typical dev layout of directories and content described in [the Zowe wiki](https://github.com/zowe/zlux/wiki/ZLUX-App-filesystem-structure) in order to demonstrate that you can include content within the ZLUX framework that was not intended for ZLUX originally.**

# Instructions
1. Clone the project into the same filesystem accessed by Zowe, or copy the cloned files and directory tree into that filesystem.

2. This Day of Year plug-in is configured with *my-first-app* as the unique application ID and title.  You can change these values if you desire, as described in the presentation.

3. Change directory to *runtimeDirectory*/bin, the directory that has the zwe command file.

4. If you do not know where the *runtimeDirectory* is, find the ZWESLSTC job and look for the CONFIG= parameter.  This tells you where the zowe.yaml file is located in the zowe-accessible filesystem.  The contents of the yaml file include the definition for *runtimeDirectory*.  In the next instruction, you will need this path to install your zowe plug-in.
5. Install your plug-in by issuing: 

     `zwe components install -c` *path-to-zowe.yaml* `-o` *path-to-plugin-root*

    Ensure you have the proper authority to issue this command, or it will fail.

6. Cycle the ZWESLSTC job.  When it comes up again, my-first-app will display in the Zowe desktop start menu.  After this restart, you can change all the web app files, save them, then use the refresh button on the Zowe desktop to force reloading of the changes.  You can debug your webapp using the browser debugger.  You web app will be found in one of the webpack folders, so look until you find it.  Only if you need to change the manifest.yaml or pluginDefinition.json file, you will need to cycle the ZWESLSTC job.

# Legal
This program and the accompanying materials are
made available under the terms of the Eclipse Public License v2.0 which accompanies
this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

SPDX-License-Identifier: EPL-2.0

Copyright Contributors to the Zowe Project.
