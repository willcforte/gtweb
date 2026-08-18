---
title: "Notes on the Locomotion of Quadruped Robots"
description: "Raw notes on whole-body control and model-predictive control approaches to quadruped locomotion."
type: note
date: 2023-11-01
tags: [robotics, locomotion, controls]
source: "Kim et al., 'Highly Dynamic Quadruped Locomotion via Whole-Body Impulse Control and Model Predictive Control' (arXiv:1909.06586)"
status: done
legacyPath: ["/robotics/locomotion_notes"]
---

# Notes on the Locomotion of Quadruped Robots

## Raw Notes

### [Kim et al.](https://arxiv.org/pdf/1909.06586.pdf)

* WBC-MPC
  * MPC - model predictive control
  * WBC - whole-body control
  * A force reaction is calculated from the simplistic MPC model and is then applied to WBC.
  * WBIC - whole-body impulse control
    * body posture stabilization
    * reaction force execution
  * state estimator sends data to kinematic model to feed back into WBIC
