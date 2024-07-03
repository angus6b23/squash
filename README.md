<div align = center>
  <img src="https://raw.githubusercontent.com/angus6b23/squash/master/public/og-banner.png" width="800" height="420" alt="squash-logo">
</div>

# Squash

<div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; margin-left: -0.5rem">
<img alt="GitHub License" src="https://img.shields.io/github/license/angus6b23/squash">
<img alt="Liberapay receiving" src="https://img.shields.io/liberapay/receives/12a.app">
</div>

An image optimization tool allows you to compress and covert images in your browser

[Live Site](https://squash.12a.app)

## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 1rem">
<img src="https://raw.githubusercontent.com/angus6b23/squash/master/public/screenshot_0.jpeg" width="240" height="135" alt="kiku-screenshot" />
<img src="https://raw.githubusercontent.com/angus6b23/squash/master/public/screenshot_1.jpeg" width="240" height="135" alt="kiku-screenshot" />
</div>

## Features

- Up-to-date encoders, using encoders provided by [Squoosh](https://github.com/GoogleChromeLabs/squoosh)
- Secure and private, no images are uploaded to any server
- No file sizes or count limit forever
- Batch optimization, drag multiple images and click Optimize All and all done
- No installation required
- You don't have to mess with cli or random npm packages
- Do not collect a five-page long "basic visitor data"
- Automatically select the best method for you with sane defaults

## Why building another image optimization tool?

I have tried:

- [Squoosh](https://github.com/GoogleChromeLabs/squoosh) - Best of all, but do not support batch optimization and [unlikely to be in near future](https://github.com/GoogleChromeLabs/squoosh/issues/1259)
- [@squoosh/cli](https://www.npmjs.com/package/@squoosh/cli) - Do not work for me and no longer maintained :(
- [Caesium Image Compressor](https://caesium.app/) - First option appears on alternative.to, but functionality really limited (5 files a time and do not support converting formats)
- tinyXXX(Insert image format here) - Those creepy webpages really make me feel reluctant to upload my images to their sites

Good thing is that squoosh is open-sourced and I can build my own version easily

## Known issues

- Browsers with dynamic import or canvas disabled (E.g. librewolf) will not work

## Building the application by yourself

1. Clone the git repository

   `git clone https://github.com/angus6b23/squash`

2. Run yarn / npm to install dependencies

   Using yarn
   `yarn`

   Using npm
   `npm install`

3. Build and package the files

   Using yarn
   `yarn build`

   Using npm
   `npn run build`

4. If the build process is successful, the files will be available in "dist" folder

## License

![img](https://www.gnu.org/graphics/agplv3-with-text-162x68.png)

This app is provided under AGPL v3.0 or later. For details, please see <https://www.gnu.org/licenses/agpl-3.0.html>
