---
title: "UAR Lect. 2 — Nonlinear Dynamical Systems"
description: "Nonlinear dynamical systems, stability definitions, and phase portraits for a simple pendulum."
type: note
date: 2025-06-17
series: uar
tags: [robotics, controls]
source: "MIT Underactuated Robotics (Spring 2024)"
status: done
legacyPath: ["/self-study/courses/uar/lect2"]
---

# UAR Lect. 2 - Nonlinear Dynamical Systems

Steve Strogatz teaches nonlinear dynamics and chaos at Cornell. He explains dynamical systems graphically, and this is the style that Russ is going for (related to graphical depiction of gradient descent).

Let our system be a simple pendulum with end point mass $m$, length $l$, CCW angle from vertical (pointing down) $\theta$, and gravity $g$.

Kinetic energy $T=\frac{1}{2}ml^2\theta^2$

Potential energy $U=-mgl\cos\theta$

Lagrangian mechanics gets $ml^2\ddot{\theta}+mgl\sin\theta=u$ (Here, $u=Q$ which is a force related to the pendulum torque $\tau$).

By adding simple damping/friction, $Q=-t\dot{\theta} + u$.

$$ml^2\ddot{\theta}+b\dot\theta + mgl\sin\theta=u$$

where $b$ is the damping term. (This is known as "viscous damping"; similar to a dashpot.)

This emulates the form:

$$M(\dot{\theta})\ddot{q}+C(q,\dot{q})\dot{q}=\tau_g(q)+Bu$$
Given the initial state $\begin{bmatrix}\theta(0) \\ \dot{\theta}(0)\end{bmatrix}$, we should be able to get $\theta(t)$, but the fact is that there exists a $\sin\theta$ within this equation means that it is no longer a linear differential equation ($Ax+By+\ldots$ where each term is a derivative of $q$). Trigonometry is nonlinear.

"Most of our interesting robots have nonlinearities."

The difficulty of nonlinearity is mainly time-based. Finding $\lim_{t\to\infty}\theta(t)$ (what a system will stabilize to) and whether a certain state will be visited (perhaps a failure state) is much easier than finding $\theta(t)$. These are the concepts of stability and reachability, respectively, which we will visit using graphical analysis.

There is a dynamical regime, with high damping, in which a first-order model of an inverted pendulum can be accurate.

$$ml^2\ddot{\theta}+b\dot\theta + mgl\sin\theta=u$$

$b\dot{\theta}\gg ml^2\ddot{\theta}$

$b\dot{\theta}$ has units $(\text{kg-m}^2)(\frac{1}{s})$ and $ml^2\ddot{\theta}$ has units $(\text{kg-m}^2)(\frac{1}{s^2})$. The only thing separating them is an $s^{-1}$.

The natural frequency of a pendulum is $\sqrt{\frac{g}{L}}$ with units $\frac{1}{s}$
because it is a frequency. This can be considered our $\dot\theta$. Therefore, one can specify the heavily-damped regime of the pendulum as $b\sqrt\frac{l}{g}\gg ml^2$, which are dimensionally-comparable quantities.

Knowing that $ml^2$ is so small allows us to approximate our system:

$$ml^2\ddot{\theta}+b\dot\theta + mgl\sin\theta=u$$

Becomes

$$b\dot\theta=u-mgl\sin\theta$$

```
mgl -|     
     |
-----+\-------------------------+
     | \           <--flow     /  
     |  \                     /  
     |   `.                 ,'
     |     `.             ,'
     |       `-.       ,-'
-mgl-|          `-,,,-'
```


Left flow because $\dot{\theta}<0$.

We want the system to be perfectly as we desire, such that the control term $u$ is zero. This helps if the state is $\begin{bmatrix}0 \\ 0 \end{bmatrix}$, so that's one of our points. All x-intercepts are "fixed points" that are stable.

If we apply a constant torque to $u$, oddly, the fixed points will come together. Above the x-axis, we go right. Below, we go left. They will eventually converge to the middle point.

The area which moves the system to a particular fixed point is known as the region of attraction.

"A linear system can only be stable at the origin." A fixed point is only "locally stable." In a linear system, only the origin is "globally stable."

## Some Defns of Stability

Local stability *in the sense of [[Lyapunov function|Lyapunov]]* ("i.s.L.")
- If you start near the region, you won't go too far from the region. (You won't leave a certain ball of space.)

Locally attractive
- Will converge to a region by $\infty$ time.

Asymptotically stable
- Attractive + i.s.L.

Exponentially stable
- There's a rate at which the system gets to convergence with some constant.

An undamped pendulum with a slight amount of swinging will be stable i.s.L. as it never leaves its "ball", but it will not be stable in the asymptotic/exponential senses.

Formal defns:

### i.s.L.

For every $\epsilon$, $\exists\delta$ s.t. within a delta ball of the fixed point $||x(0)-x^*||<\delta$, then this implies that you will never leave the epsilon ball, $\implies\forall t||x(t)-x^*||<\epsilon$.

We start within the delta ball. Therefore, we'll surely be within the less-rigorous epsilon ball.

"The local invariant sets may not be circular." (?)

### Locally attractive

$\lim_{t\to\infty}x(t)\to x^*$

You can be attractive but not i.s.L., such as an orbiting position that never stabilizes at the globally-stable point $x^*$.

### Asymptotically stable

i.s.L. && locally attractive

### Exponentially stable

We have a linear system $Ce^{-at}$, and the difference from the attractor will converge faster than the linear system.

$\forall t||x(t)-x^*||<Ce^{-at}$

## Neural networks

Let us look at the dynamics of a simple recurrent neural network ([[RNN]]), recurrent in that it is a looped process.

An input $u$ comes in, weighted by $w$, and processed through nonlinear dynamics (in this case, a function $\tanh(\sum_i w_iu_i)$), and it is run through the process again.

A single-neuron RNN is called an *autapse*. We find them when growing neurons in a dish who have nothing to attach to.

$$\hat{x}=-x+\tanh(wx)$$

This looks like $\tanh$, but tangent to $y=x-1$ and $y=x+1$ instead of $-1$ and $1$.

If $w\approx 0$, we can already see that the whole system would become quite stable.

At the first positive hump, our $\dot{x}$ increases so as to push us rightwards. Thus the $\rightarrow\:\leftarrow$ pattern.

Viewing the arrows allows you to see that there are stable points at $x=\pm 1$.

The autapse can be used to represent memory because its bistability can be affected by an input $u$, making it so that it permanently holds the data of what its input was.

We can add a "forgetting term" using $\tanh(wx+u)$.

When we talk about optimization in a neural network, one may say that "all minima are global minima" in the case of fixed points and autapses.

A *Hopfield network* has multiple fixed points, each one being associated with a certain memory. You can program the neural network to have fixed points wherever you want to store different states, I suppose.

Because each state (e.g. an image) is a fixed point, there exists a "region of attraction" such that merely getting close to the image in pixel space will pull you into the full image. Dynamics makes this transition.

## Mid-Lecture Reflection

There is clearly more I need to research in the fundamentals of learning and dynamical systems in order to make fundamental advances in robotic dynamics. I am seeing what Russ means by saying that the various approaches are more similar than different, i.e. they are all dynamical systems that can be analyzed to determine what things are stable. Hopefully for the future, we can better utilize probabilistic estimations of stability for safe robotics.

## Second-Order Systems

They (2D phase portraits) are a little harder to graphically analyze.

$$ml^2\ddot{\theta}+b\dot\theta+mgl\sin\theta=u$$

$\dot{x}=f(x,u)$ is our time-dependent system.

How the *state-space* phase portrait differs from the typical depiction of the *phase space* is that we use position and velocity, not position in momentum (the latter is more common in physics).

$x=\begin{bmatrix}\theta \\ \dot\theta\end{bmatrix}$

$\dot{x}=\begin{bmatrix}\dot{\theta} \\ \ddot{\theta}\end{bmatrix}=\begin{bmatrix}\dot{\theta} \\ \frac{1}{ml^2}[u-b \dot{\theta}-mgl \sin \theta]\end{bmatrix}$

When this is plotted, it becomes apparent that the system has a patterned, almost-circular trajectory throughout the state space, which sort of looks like several eyeballs.[^1]

We can see that, because it is circular, it is Lyapunov stable because it does not move outside of our epsilon ball (the eyeball), but it is not asymptotically stable.

Along the *homoclinic* curves, there is a constant energy of $mgl$. If you start with too much energy, you go counterclockwise, just like an inverted pendulum failing to balance with too much speed. If you start with too little energy, you go counterclockwise like an inverted pendulum with not enough speed. With the wrong amounts of energy, we spiral into the asymptotically-stable attractor.

In summary: you can learn a lot by looking at the phase portraits, especially by plotting the optimal control algorithms on top of them to watch how they work with the dynamics.

Our goal with controls is to change the vector field with $u$. It doesn't let us change what direction we go in at a certain point, but we can slightly change the magnitudes of the vectors.

"What's the minimal change in the vector field that reflows the dynamics in the way we want?" We don't want to make drastic changes, as that does not respect the physics and instead replaces it.

We will use optimization and machine learning to shape the controlled system as we desire.

## Footnotes

[^1]: Note that the second-order phase portrait has no non-Euclidean manifolds because we're leaving out $\theta$. $\theta$ loops between $2\pi$ and 0, as you know.
