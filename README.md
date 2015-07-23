# plat-date-picker

This is a mobile-friendly datepicker control created for use with PlatypusTS. It ensures that a valid date is always selected.

## Installation

Use `npm install` to install the dependencies for this package.
Use `npm run prepublish` to install the typings and get the project ready for compilation. Depending on your IDE, you may need to quit your IDE and open it again to dismiss any code warnings.

## Running
Use `npm run build` to build the project.
Use `npm run start` to start a local web server on port 3000.
You can view the working example at http://localhost:3000. The date picker will be initialized to today's date.


## Roadmap
This is the date picker roadmap. I will update it with goals as time goes on.
1. Allow the minimum and maximum years to be set with plat-options. Right now, they are arbitrarily set in two places:
    * In datepicker.tc.ts: In the class variables minYear and maxYear.
    * In datepicker.tc.html: In the min and max declaration within the plat-options field of the year slider.
    
### Useful Scripts

The following are descriptions for a few of the useful npm scripts. All of these scripts can be executed using the `npm run <script>` command.

- **build**
  - Builds/bundles/minifies your `less` and `ts`
  - copies the necessary files to `/cordova/www`
  - runs `cordova build`

- **clean**
  - Cleans your `app` directory, removing css/js/map files and your `dist` directory

- **lint**
  - Runs `tslint` on all of your `ts` files
  - You can specify your custom lint rules in your `tsconfig.json`
  - Default rules can be found at the [tsconfig-lint](https://github.com/wjohnsto/tsconfig-lint#user-content-default-rules) project

- **prepublish**
  - Runs during `npm install`
  - Installs/links TypeScript declarations using [tsd](http://definitelytyped.org/tsd/)
  - Runs [tsconfig-glob](https://github.com/wjohnsto/tsconfig-glob) to setup your `tsconfig.json`

- **start**
  - Builds/bundles your src files and watches them for changes
  - Rebuilds/bundles when your src files change
  - Starts server that serves assets from the `app` directory on http://localhost:3000

- **tsd**
  - Installs/links TypeScript declarations using [tsd](http://definitelytyped.org/tsd/)
