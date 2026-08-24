---
title: "CS229 Lect. 2"
description: "Stanford CS229 NNs"
type: note
date: 2025-06-15
series: cs229
tags: [machine-learning]
source: "Stanford CS229, Autumn 2018 lecture series"
status: wip
legacyPath: ["/self-study/courses/cs229/lect2"]
---

# CS229 Lect. 2

## Linear Regression

Linear regression is one of the simplest learning algorithms. This is a supervised learning algorithm because the data is labeled.

Ex: Predict the price of garden hoses

Training -> learning algo -> hypothesis func. $h$

The hypothesis is $h:X\to Y$ where $h(x\in X)=\theta_0+\theta_1x$ (affine function). This assumes that we have one variable $x$.

If we have two variables (note that complex phenomena generally require many variables to be accurately predicted, e.g. thousands of pixles), $h(x_1,x_2)=\theta_0+\theta_1x_1+\theta_2x_2$. We can see that this nomenclature pattern matches $\theta_k$ with $x_k$, and $x_0$ doesn't exist because $\theta_0$ is the affine parameter.

Our parameters can be stored in the vector $\theta=\begin{bmatrix}\theta_1 \\ \theta_2 \\ \theta_3\end{bmatrix}$.

Our features can be stored in $x=\begin{bmatrix}x_1 \\ x_2 \\ x_3\end{bmatrix}$.
