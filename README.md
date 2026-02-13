# Uniterminator | Parallel & Elimination Uniterm Visualization System

A specialized visualization engine designed to model, persist, and render complex parallel and elimination uniterm operations utilizing dynamic vector graphics and a reactive distributed architecture.

## 📺 Demo & Visuals
*Visual representation of the system in operation.*

### 🚀 System Overview
![Main Dashboard](/Docs/Screenshots/Main.png)

### ⚙️ Core Operations & State Management
* **Parallelize:** ![Parallelize Operation](/Docs/Screenshots/Parallelize%20Operation.png)
* **Eliminate:** ![Eliminate Operation](/Docs/Screenshots/Eliminate%20Operation.png)
* **Swap Transformations:** ![Swap A](/Docs/Screenshots/Swap%20A%20Operation.png) ![Swap B](/Docs/Screenshots/Swap%20B%20Operation.png)
* **Persistence & Cleanup:** ![Save State](/Docs/Screenshots/Save.png) ![Remove Element](/Docs/Screenshots/Remove.png)

## 🏗️ Architecture & Context
*High-level system design and execution model.*

* **Objective:** Provision of a high-fidelity graphical workspace for defining mathematical transformations with atomic persistence of operation states.
* **Architecture Pattern:** **Vertical Slice Architecture** (Backend) to ensure high feature cohesion, paired with a Component-Service reactive architecture (Frontend).
* **Data Flow:** User Interactions -> Angular Reactive Layer -> Expression Service (State Management) -> Dynamic SVG Layout Engine -> REST API (C#) -> SQL Server.

## ⚖️ Design Decisions & Trade-offs
*Technical justifications for architectural and rendering choices.*

* **Visualization Strategy: Native SVG Data Binding**
    * **Context:** Requirement for precise, reactive arcs and segments connecting dynamic, user-defined text elements.
    * **Decision:** Implementation of native SVG utilizing Angular's property binding.
    * **Rationale:** Allows for direct, low-overhead interaction with the DOM for real-time text measurement. This approach avoids the weight of external visualization libraries and integrates seamlessly with Angular’s Change Detection cycle.
    * **Trade-off:** Accepted increased complexity in manual coordinate geometry and path calculation logic in exchange for total control over the rendering pipeline and zero external dependencies.

* **Backend Structure: Vertical Slice Architecture**
    * **Context:** A domain-driven system with distinct, independent operations (Snapshots, Parallelize, Eliminate).
    * **Decision:** Adoption of Vertical Slices over traditional Layered Architecture.
    * **Rationale:** Encapsulates all feature-specific logic (DTOs, Endpoints, Handlers) into isolated directories, maximizing cohesion and reducing the cognitive load required to maintain specific features.
    * **Trade-off:** Prioritized maintainability and "Single Responsibility" per slice, accepting potential minor code duplication across similar operations to avoid leaky abstractions.

## 🧠 Engineering Challenges
*Analysis of non-trivial technical hurdles in the visualization pipeline.*

* **Challenge: Multi-Pass Layout Engine for Dynamic SVG Elements**
    * **Problem:** Calculating connection coordinates for SVG `<path>` elements requires precise pixel-width measurements of rendered text. Accessing $getBBox$ during the standard render cycle frequently triggers `ExpressionChangedAfterItHasBeenCheckedError` or layout thrashing.
    * **Implementation:** Developed a **two-pass rendering cycle** utilizing `queueMicrotask`. The first pass renders text elements to the DOM; the second pass retrieves dimensions and calculates path attributes (`d`) before the final browser paint.
    * **Outcome:** Perfectly aligned vector graphics that adapt instantly to content changes without visual jitter or framework-level state conflicts.

* **Challenge: Reactive State Synchronization**
    * **Problem:** Maintaining a consistent visual workspace while decoupling the presentation layer from the persistence management system.
    * **Implementation:** Implementation of a centralized **RxJS BehaviorSubject** pattern within the `ExpressionService` as the single source of truth. API DTOs are mapped directly into reactive streams, which the SVG engine consumes to reconstruct complex visual hierarchies.
    * **Outcome:** A fully reactive UI where loading saved snapshots triggers an atomic reconstruction of the visual state without imperative DOM manipulation.

## 🛠️ Tech Stack & Ecosystem

* **Core:** .NET 9.0 (C#), Angular 19, TypeScript 5.x
* **Persistence:** Microsoft SQL Server, Entity Framework Core 9 (Code First)
* **API Documentation:** Scalar (Modern OpenAPI alternative)
* **Tooling:** Mapster (High-performance mapping), Angular CLI, Docker Compose

## 🧪 Quality & Standards

* **Testing Strategy:** Functional validation is conducted through manual exploratory testing cycles using specialized mathematical uniterm scenarios to ensure rendering accuracy.
* **Code Standards:** Strict adherence to **Vertical Slice Architecture** principles, ensuring that each feature remains self-contained and modular.
* **Engineering Principles:** Heavy reliance on **Reactive Programming (RxJS)** to manage asynchronous state and **Clean Code** patterns to facilitate readability in the absence of automated test suites.

## 🙋‍♂️ Author

**Kamil Fudala**

- [GitHub](https://github.com/FreakyF)
- [LinkedIn](https://www.linkedin.com/in/kamil-fudala/)

## ⚖️ License

This project is licensed under the [MIT License](LICENSE).
