# Knowledge cave

## Architecture

### racine

 - un dossier `build` qui correspond au dernier build réalisé par webpack
 - les `nodes_modules`
 - `src`, qui contient le code source
 - un `.babelrc` permettant de compiler le code JS ES8+ en ES5
 - un `package.json` contenant les informations essentielles au projet
 - un `webpack.config.js` contenant la configuration webpack
 - un `yarn.lock` permettant de figer les versions des dépendances

### src

  - un dossier `common` recensant l'ensemble des composant réutilisables et/ou transverses aux différentes pages
  - un dossier `core` dans lequel on stock l'application générale, son style et un `assetTransformer`
  - un dossier `page` contenant l'ensemble des pages sous forme de composants
  - un dossier `resources` contenant les ressources (images, ...)
  - un dossier `services` contenant les différents services (backend, etc.)
  - un `index.html` contenant la base HTML de l'application dans laquelle on vient plugger le code React
  - un `index.jsx` qui est le point d'entrée de notre application
  - un `index.scss` contenant du style très général au code de base HTML

### composant

  - NomDuComposant
    - NomDuComposant.jsx
    - NomDuComposantContainer.jsx
    - NomDuComposant.scss
    - index.js

Pour chaque composant, j'utilise un container dont le rôle est de gérer l'état du composant, et un "presentational", dont le rôle est de gérer l'affichage. Le container est sous forme de classe, et le presentational, sous forme de composant fonctionnel.

L'`index.js` sert aux pages qui ont besoin du composant, à s'abstraire de la logique `container-presentational` interne.

## Axes d'amélioration

Lors de la réalisation de cette démo, j'ai tenté d'aller un maximum à l'essentiel. J'ai donc noté des axes d'amélioration:

- On pourrait ajouter du typage, exemple `FlowType` ou utiliser le langage `TypeScript` pour limiter les bugs au runtime.
- Il aurait fallu écrire les services dans une logique TDD. Définir un fichier de specs, puis écrire le service.
- Il pourrait être intéressant de mettre `Redux` en place si l'application venait à grossir. Aujourd'hui, je ne l'ai pas mis, délibérément, par manque de nécessité.
- Si l'application ets destiné à un public international, on peut penser à mettre en place de l'`i18n`.
- Aujourd'hui, seuls les informations des 10 posts lus sont fetchées. Il pourrait être très intéressant de charger les pages directements précédentes et suivantes, pour éviter les latences lors du changement de page.
- La `responsivité` est à améliorer.
- On pourrait mettre un `loader` lors du chargement des données. Celui de semantic-ui n'est pas parfait. Je l'ai testé puis enlevé.
- Le transfert entre container et presentational de la page active ets un peu bricolé avec un +1, -1. Y'aurait-il une meilleure fçon de faire ? A réfléchir.
- L'appli pourrait être contenerisée avec Docker, pour permettre un déploiment plus simple.