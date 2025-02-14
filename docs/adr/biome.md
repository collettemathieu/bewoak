# Architecture Decision Record (ADR)

## Title

Biome as formatter and linter

## Status

[Accepted]

## Context

Prettier and eslint are great tools, but very slow in the javascript ecosystem. The challenge is to find an efficient alternative while maintaining excellent project quality.

## Decision

We decided to choose the Biome tool, which is both a formatter and a linter.

## Alternatives Considered

None.

## Consequences

Integration with Nx is not always easy. In particular, it is not currently possible to integrate @nx/enforce-module-boundaries. This feature is only available with EsLint. In particular, it allows you to create import constraints between libraries.

## References

Any.

## Date

2025-14-02

## Authors

Mathieu COLLETTE
