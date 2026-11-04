<p align="center"><img src="https://raw.githubusercontent.com/titaniumnetwork-dev/Ultraviolet-Static/main/public/uv.png" height="250"></p>

<h1 align="center">Ultraviolet</h1>

<a href="https://www.npmjs.com/package/@titaniumnetwork-dev/ultraviolet"><img src="https://img.shields.io/npm/v/@titaniumnetwork-dev/ultraviolet.svg?maxAge=3600" alt="npm version" /></a>

> [!CAUTION]
> Please note that this project isn't really maintained anymore before making issues! It has been superseded by [Scramjet](https://github.com/MercuryWorkshop/scramjet). An example application setup can be found [here](https://github.com/MercuryWorkshop/Scramjet-App).

Ultraviolet is a highly advanced web proxy used for evading internet censorship or accessing websites in a controlled sandbox. It is designed with security and performance in mind. Ultraviolet intercepts HTTP requests with a service worker, while adhering to the [TompHTTP specifications](https://github.com/tomphttp) and is a leader in innovative web proxy technologies.

## Features

Ultraviolet offers several features that set it apart from its predecessors, including CAPTCHA and hCAPTCHA support, URL encoding settings for added security, client-side configuration via service-workers, high speed compared to other web proxies, blacklist settings and more for easy hosting, leak prevention, regular updates, and improved resource usage and speed for better setups with a dedicated server instance.

## Supported Sites

Some of the popular websites that Ultraviolet supports include:

- [Google](https://google.com)
- [Youtube](https://www.youtube.com)
- [Spotify](https://spotify.com)
- [Discord](https://discord.com)
- [Reddit](https://reddit.com)
- [GeForce NOW](https://play.geforcenow.com/)
- [now.gg](https://now.gg)

## Used by

- [Holy Unblocker LTS](https://github.com/QuiteAFancyEmerald/Holy-Unblocker)
- [Alu](https://github.com/titaniumnetwork-dev/Alu)
- [Incognito](https://github.com/titaniumnetwork-dev/Incognito)
- [Nebula](https://github.com/NebulaServices/Nebula)
- [AnuraOS](https://github.com/MercuryWorkshop/anuraOS)
- [Terbium](https://github.com/TerbiumOS/webOS)
- [Metallic](https://github.com/Metallic-Web/Metallic)

## Upgrading

A guide for updating from any version to v3 can be found [here](https://github.com/titaniumnetwork-dev/Ultraviolet/wiki/Upgrading).

## Older Ultraviolet versions

Starting from v3, Ultraviolet uses [bare-mux](https://github.com/MercuryWorkshop/bare-mux), a library that allows you to switch out your Bare client.

If you operate using an older Ultraviolet, we encourage you to update.

If you're too lazy to do either of the above, you can install an outdated and unsupported version of Ultraviolet.

```sh
npm install @titaniumnetwork-dev/ultraviolet@1
```

## Changelog

Changes are documented in the [changelog](./CHANGELOG.md).

## Deployment

### Cloudflare Pages

The build produces a static Pages site in `dist`. Set the Pages build command to `npm run build` and the output directory to `dist`, or deploy with Wrangler:

```sh
npm install
npm run build
npx wrangler pages deploy dist
```

The entry page automatically opens proxied `youtube.com`. The service worker blocks navigation and frames to other hosts, while allowing YouTube's supporting media and API requests.

Cloudflare Pages hosts the static frontend. Deploy the Bare backend separately from `backend/` to Fly.io; it applies a server-side allowlist to YouTube and its media/API hosts. The build defaults to this repository's Fly app at `https://ultraviolet-slgz8a.fly.dev/bare/`. If you deploy the backend under a different URL, set `UV_BARE_SERVER_URL` to that URL (ending in `/bare/`) in the Pages build environment and rebuild the site. For local builds, set this variable before running `npm run build`.

The Fly app can be created and deployed from the `backend/` directory with `fly launch --no-deploy` followed by `fly deploy`. Change the `app` name and `primary_region` in `backend/fly.toml` to values available to your Fly account. The health endpoint is `/healthz`.

For a complete application setup, see [Ultraviolet-App](https://github.com/titaniumnetwork-dev/Ultraviolet-App).

## Documentation

Documentation can be found in the [wiki](https://github.com/titaniumnetwork-dev/Ultraviolet/wiki).
