
<h1 align="center">tamland</h1>

<h1 align="center">
  <img
    src="https://raw.githubusercontent.com/feight/tamland/master/resources/brick.jpeg"
    alt="tamland"
    title="tamland"
    width="300"
  >
</h1>

<p align="center" style="font-size: 1.2rem;">
  A framework for creating Progressive Web Apps and deploying them to
  Google App Engine.
</p>

<div align="center">

  [![License](https://img.shields.io/npm/l/@loadable/component.svg)](https://github.com/feight/tamland/blob/master/LICENSE)

</div>

<br>

## Features

1. Typescript
2. React
3. SSR
4. PWA
5. App Engine deployment integration

## Installation

Install yeoman globally

  ```sh
  npm install -g yo
  ```

Install the tamland yeoman generator

  ```sh
  npm install -g @tamland/generator-tamland
  ```

Run the tamland yeoman generator

  ```sh
  yo @tamland/tamland
  ```

You'll be prompted for a project name. This name will be used to create a new folder.
The project will be installed in this folder.

## Usage

After installation, cd into the new folder

  ```sh
  cd new-project-name
  ```

Run the setup to install all the dependencies for working with Google App Engine

  ```sh
  npm run setup
  ```

## Local development

From with the project folder run the local script

  ```sh
  npm run local
  ```
