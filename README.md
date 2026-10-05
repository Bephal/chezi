# Chezi — In motion

A personal 3D dance viewer generated from a portrait using fal.ai.

Rotate and zoom the character, pause the dance, seek through the animation, change playback speed, and download the animated GLB. The page works on desktop and mobile.

## GitHub Pages

This is a static website and needs no build step or API key.

Publish the repository's `main` branch from `/` in **Settings → Pages → Build and deployment → Deploy from a branch**.

GitHub supplies the site URL after deployment. All assets use relative URLs so the viewer works under a repository path such as `/chezi/`.

## Local preview

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Assets

- `assets/dancing.glb`: textured, rigged character with a looping All Night Dance animation. Horizontal root motion is centered for mobile framing.
- `assets/model-viewer.min.js`: Google's model-viewer 4.1.0, licensed under Apache-2.0. Source: https://github.com/google/model-viewer

The body and clothing were inferred from the portrait. No fal.ai credentials are included or needed by visitors.
