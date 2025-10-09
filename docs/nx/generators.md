# NX Generators

[[_TOC_]]

## Main generators

### Create a Nx:Node:Library

```bash
bun run nx generate @nx/js:lib --name=init-pathway --bundler=swc --directory=libs/pathway-design/server/business/usecases --importPath=@bewoak/pathway-design-server-business-usescases-init --publishable --linter=none --minimal --strict --tags=type:business:pathway-design:server --unitTestRunner=none --projectNameAndRootFormat=derived -d
```

### Create a Nx:Nest:Library

```bash
bun run nx generate @nx/nest:lib --name=pathway --buildable --publishable --directory=libs/pathway-design/server/business/entities --importPath=@bewoak/pathway-design-server-business-entities-pathway --linter=none --strict --tags=type:business:pathway-design:server --unitTestRunner=none --projectNameAndRootFormat=derived --standaloneConfig -d
```

### Convert a Nx:Library to swc compiler

```bash
bun run nx g @nx/js:convert-to-swc pathway-design-server-business-entities-pathway
```

### Create a Nx:Angular:Library

```bash
bun run nx generate @nx/angular:lib --buildable --publishable --linter=none --unitTestRunner=none --style=scss --strict --name test-component --directory libs/search/client --importPath=@bewoak/search-client-test-component 
```

