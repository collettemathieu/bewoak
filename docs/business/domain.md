# Bewoak

## Functionalities

### Objective

Bewoak aims to help researchers deepen their knowledge in a specific domain or subdomain through educational pathways.

### Scientific Research Domain

Researchers work within specific scientific fields such as astronomy, biology, chemistry, computer science, mathematics, physics, etc.
Each scientific domain can contain several subdomains.
Researchers include various roles like professors, PhD students, post-docs, research associates, research directors, lecturers, and HDR (qualified to supervise research).

### Educational Pathways

Created by researchers within their domain of expertise.
Comprised of a series of articles with resources such as books, publications, podcasts, or videos.
Articles are ordered by the pathway creator to guide learners through the subject matter.

### Learners

Researchers who follow the educational pathways to learn and explore scientific domains.
Must read articles in the specified order, marking each article as read to unlock the next.
Can review previously read articles at any time.
Upon completing all articles, learners can mark the pathway as finished, gaining a better understanding of the studied domain.

## Features

### Account Management (Register)

* User registration and authentication.
* Requires a recommendation from an existing user for new registrations.

### Scientific Domain Data (ScientificDiscovery)

* Fetch and update domain data via a third-party API to classify learning pathways.

### Pathway Search (Search)

* Allows users to search for relevant educational pathways.
* Users can add pathways to their favorites list for easy access.

### Progress Tracking (PathwayProgress)

* Tracks learners' progress through the educational pathways.
* Manages the state of advancement and updates learners on pathway modifications.
* Notifies learners when pathways are updated by their authors, reopening the pathway at the point of change.

### Pathway Creation (PathwayDesign)

* Authors can create and manage educational pathways.
* Handles the addition, modification, and deletion of articles within pathways.

### Unified View (PathwayNavigator)

* Aggregates data from PathwayDesign and PathwayProgress.
* Provides a comprehensive view of a learner’s progress within a specific pathway, showing both the pathway details and the learner's advancement.
