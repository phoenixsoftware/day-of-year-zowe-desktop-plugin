This program and the accompanying materials are
made available under the terms of the Eclipse Public License v2.0 which accompanies
this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

SPDX-License-Identifier: EPL-2.0

Copyright Contributors to the Zowe Project.
# sample-iframe-app
This sample app is made to showcase two important abilities of the ZLUX App framework.
The first is the ability to bring web content into ZLUX that is non-native, that is, that is not developed with ZLUX in mind or written around an unsupported framework (As opposed to Angular or other supported frameworks).
This is accomplished by providing a wrapper that brings web content into ZLUX by utilizing an iframe wrapped in an Angular shell.
Content within an IFrame interacts with content in a webpage differently than content which isn't in an IFrame, so the second purpose of this App is to show that even when in an IFrame, your content can still accomplish App-to-App communication as made possible by the ZLUX App framework.

This app presents a few fields which allow you to launch another App, or communicate with an already open App instance, in both cases with some context that the other App may interpret and some action.

**Note: This App requires the [Sample Angular App](https://github.com/zowe/sample-angular-app) to be installed.**

**To request features or report bugs, please use the issues page at the [zlux repo](https://github.com/zowe/zlux/issues) with the sample-app or app tags**

**Note: This App intentionally does not follow the typical dev layout of directories and content described in [the wiki](https://github.com/zowe/zlux/wiki/ZLUX-App-filesystem-structure) in order to demonstrate that you can include content within the ZLUX framework that was not intended for ZLUX originally.**


This program and the accompanying materials are
made available under the terms of the Eclipse Public License v2.0 which accompanies
this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

SPDX-License-Identifier: EPL-2.0

Copyright Contributors to the Zowe Project.
