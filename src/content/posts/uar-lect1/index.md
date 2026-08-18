---
title: "UAR Lect. 1 — Embrace Robot Dynamics"
description: "Fully- vs. underactuated dynamics, feedback equivalence, and the manipulator equations."
type: note
date: 2025-06-17
series: uar
tags: [robotics, controls]
source: "MIT Underactuated Robotics (Spring 2024)"
status: done
legacyPath: ["/self-study/courses/uar/lect1"]
---

# UAR Lect. 1 - Embrace Robot Dynamics

Atlas doesn't use much learning--it is still very much rooted in the classical methods. ANYmal, on the other hand, is all RL. Russ' work with [Toyota Research Institute](https://www.tri.global/our-work/large-behavior-models) uses imitation learning methods for intelligent manipulation.

In this class, we will get into the control of dynamical systems using nonlinear optimization and machine learning (a fusion of the classical and neural). We will find methods to, in effect, increase the region of attractions of the desired attractor of our robot.

The prerequisites of the class require lin. alg., diff. eq., Python, and some neural net stuff.

Russ advises that one of the most important things to learn outside of class is optimization (I suppose this is neglected in most curricula).

* Atlas uses planning + mechanics + optimization.[^1]
* ANYmal and other quadrupeds often use reinforcement learning (RL). (We investigate the boundaries of performance with bipeds using agile, low-distal-mass robots with powerful BLDC motors.)
* In manipulation, imitation learning is king.

Russ believes that these different methodologies are more similar than different.

## Basic Feedback Loop

```
         (e.g. motor torque     
            commands)              
                |                      
                v
         +---------------------+
         |  Robot              |
         | (Environment/plant) |
         +---------------------+
           ^               |
           |               v
     actions (motors)   observation (sensors)
           |               ^
           v               |
         +---------------------+
         |      Policy         |
         |     /Controller     |
         +---------------------+

```

If we make certain assumptions to solve specific problems, we can approach things more effectively. Writing a generalistic algorithm that can handle literally anything is very hard and has not been achieved yet, similarly to AGI.

Some control systems are harder than others (a sort of P-NP complexity class):

Things are made more difficult (or, optimistically, Russ says "more rich") due to poor observations, heavily-consequential actions, and high dimensionality (it's typically a lot more computationally intensive the longer the vectors are).

## Nonlinear Differential Eq.

$$\dot{x}=f(x,u)$$

where $x$ is the state vector, $u$ is the control input. All of these variables are vectors to deal with the multi-dimensional state (for each joint, you typically have two numbers, the velocity $\dot{q}$ and position $q$).

Let us have observations $y=g(x)$, where we make observations of the state $x$.

## Linear Diff. Eq.

A linear diff. eq.:

$$\dot{x}=Ax+Bu.$$

Newton tells us that dynamical systems are second-order due to $F=ma$, where acceleration is $\ddot{a}$. The acceleration on a joint uses the state $x$, which contains $q$ and $\dot{q}$, and the control input $u$. Therefore, $\ddot{q}=f(q,\dot{q},u)$.

We split this up into an affine equation, where affine is the typical definition of "linear" that we think of with an $x$-dependent term and a constant term:

$$(1)\quad\quad\ddot{q}=f_1(q,\dot{q}+f_2(q,\dot{q})u$$

Def $(1)$ is fully-actuated at the joint state $(q,\dot{q})$ when any control input $u$ can bring it to any acceleration for any of the joints, meaning that you can do whatever you want. This means that there is a surjective map from the control input $u$ to the eventual state vector $x$, because we can reach any point in $\mathbb{R}^n$ where $x\in\mathbb{R}^n$.

This is underactuated when $rank[f_2(q,\dot{q})]<m$ where $\dim(q)=m$, meaning that there are some points that you cannot reach by control--there are some things you can't do.

## Feedback Equivalence

With a second-order system $\ddot{q}=f_1(q,\dot{q})+f_2(q,\dot{q})u$ and the desired acceleration $\ddot{q}_d$, we can must find the suitable control input $u$.

$u=f_2^{-1}(q,\dot{q})[\ddot{q}-f_1(q,\dot{q})]$ would be derived immediately from the prior equation, but this is with the rather large assumption that the inverse exists for all states ($\forall x \exists u$, i.e. fully-actuated). Assuming that $u$ holds this value, we expect that $\ddot{q}=\ddot{q}_d$.

This is "feedback equivalent" to $\ddot{q}=u$.

> [!WARNING]
> What does feedback equivalence mean?

If we run this controller, we "erase" the dynamics from the system (literally, using the negation $\ddot{q}_d-f_1(q,\dot{q}$). This works, but it limits robotics as opposed to the potential of working with the dynamics of the system.

Russ simulates a double inverted pendulum using Drake in a Jupyter notebook. With a motor on each of the joints, we are fully-actuated and can do anything, such as acting like a single inverted pendulum or upside down. Erasing the dynamics allows anything to be possible.

When a robot leg swings forwards, the roboticists of yore would cancel out that pendulum action and simply step. The underactuated roboticist instead harnesses this angular momentum and walks, carrying its momentum like a human.

Walking robots are never fully-actuated unless you do flat steps. This is because the ankle acts as a pivot point, making it a non-actuated revolute joint.

### Breaking Feedback Equivalence

The following would break feedback equivalence:

- "Input saturations" such as limiting $u$ to $u\in[-10,10]$
	- Using the generalized definition of underactuation (I believe the one using the rank), this makes a lot of systems technically underactuated.
- State limitations such as not being able to pass through obstacles
- Model uncertainty

An Acrobot in the Gym environment is underactuated with the bar joint, but you can control the model as if it is actuated.

$f_2(q,\dot{q})\in\mathbb{R}^{m\times n}$ 

Russ has more muscles (motors $m$) than joints $n$, but he is still underactuated because he cannot immediately control his center of mass, such as when you are in the air. "\[The control matrix of the torso\] is low-rank" where high-rank would be equal to $m$.

Deriving the double pendulum equations:

$x_{ee}=l_1\sin(\theta_1)+l_2\sin(\theta_1+\theta_2)$

$y_ee=l_1\cos(\theta_1)+l_2\cos(\theta_1+\theta_2)$

I won't complete the derivation here

This uses the Lagrangian to describe the mechanics of the system.

## Drake

This class uses the open-source software Drake by TRI, which has equations and symbolic functionality if you want.

## The Manipulator Equations

The equations that underpin all of the robot manipulator arms:

$$(1)\quad\quad M(q)\ddot{q}+C(q,\dot{q})\dot{q}+\tau_g(q)+Bu$$

where $M$ is the mass matrix, $C$ is the Coriolis term, $\tau$ is the gravity term, and $B$ is the actuator selector matrix.

$M(q)>0$ (positive definite)

$T=\frac{1}{2}q^{-T}M(q)\dot{q}$

Because it is positive definite, you can always invert $M$ using $\ddot{q}=M^{-1}(q)[C(q,\dot{q})\dot{q}+\tau_g(q)+Bu]$, which is easily derived from the first manipulator equation $(1)$.

The condition of saying that $f_2$ is full row-rank (which it must be in order to be invertible) distills down to just $B$ being full row-rank.

By just looking at the matrix $B$ and determining that it is full row-rank, you can determine that the system is fully-actuated. Because $B\in\mathbb{R}^{m\times n}$ is, again, the actuator selector matrix with $m$ rows, a simply fully-actuated system would look like an identity matrix with an actuator $m$ for every joint $n$ (1:1).

## Epilogue

During Russ' time in robotics, the SOTA went from Pete Dilworth's dinosaur robots to the unveiled Honda ASIMO, which was fully-actuated and simply ignored the dynamics for a "robotic" look and energy efficiency.

Meanwhile, Steve Collins and [Andy Ruina](http://ruina.tam.cornell.edu/) were researching passive dynamic walkers (PDWs) which utilized the inverse pendulum dynamics, powered only by gravity.

This dichotomy shows the difference between full and underactuation.

"Don't try to erase your dynamics. ... We should be pushing and pulling the dynamics with minimal control."

Before Russ' time at MIT, the Leg Lab was working on agile legged robots before it evolved into Boston Dynamics.

Airplanes, too, need to take advantage of their dynamics. What a bird sees as a method of perching is seen in aerodynamics as an undesirable stall.

The rainbow trout passively takes advantage of its bodily dynamics using a [von Kármán](https://en.wikipedia.org/wiki/K%C3%A1rm%C3%A1n_vortex_street) gait, swimming upstream in the vortices behind river rocks without exerting any energy at all. "The mechanics of the body are designed to resonate with the vortices it experiences in the world."

Dynamics should be embraced, not cancelled.

## Footnotes

[^1]: Sort of a fusion of classics and learning, as I understand it. I believe RAI has been investigating more learning methods for BD robots.
