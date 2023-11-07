---
title: "locomotion test"
description: "desc"
date: "11/1/23"
---

# Notes on the Locomotion of Quadrupted Robots

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