# blog
 
### Docker configuration and installation

1. add folder to vscode workspace
2. prerequisites:
- wsl installer
- docker installer
- vsc installer
- dockerfil and docker compose files
- package.json
3. install the docker addon on visual studio code
4. create a new project in visual studio using the project folder as workspace
5. to add the image using the dockerfile and compose in visual studio run this command on powershell: "docker-compose up " wait for installation to complete. 
6. To launch the container run this command on powershell "docker-compose run or in the docker vsc explorer, right-click then run on the container.
7. To stop the container, either press "ctrl c" in the docker terminal, or execute the command "docker-compose stop" on powershell: "docker-compose stop
                              
Additional information: the blog and database user connection variables are in the docker compose file, as are the ports affiliated with each service. 

### Configuration TypeScript

This project uses TypeScript to improve type security and facilitate development. Follow these steps to configure the development environment.

1. TypeScript installation

```bash
npm install typescript --save-dev
```

2. Create tsconfig.json file
Create a tsconfig.json file in the project root with the following contents:

```json
Copy code
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

3. Transpile TypeScript
Run the build script to transpile the TypeScript code into JavaScript.

```bash
npm run build
```

4. Linter and Code Formatter
Use ESLint with TypeScript and Prettier for code linting and formatting.

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

5. Type definitions
Configure TypeScript type definitions for third-party libraries.

6. Build and Linting scripts
Use the following scripts in the package.json file:

```json

"scripts": {
  "build": "tsc",
  "lint": "eslint src --fix"
}
```

7. Watch Mode
For continuous development, use watch mode.

```bash
npm run build:watch
```

Add additional information

Add other details specific to your project, such as naming conventions, recommendations for additional tools, etc.

Add Instructions for Collaborators

Include instructions on how team members can contribute to the project, taking into account the TypeScript configuration.

Update as required

Update the README.md file as your configuration evolves or new information is added.
