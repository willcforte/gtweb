---
title: "Inverted Pendulum Project Log #1 - CAD & Tolerancing"
description: "Creating a Fusion 360 assembly and bill of materials for my inverted pendulum project."
date: "Aug. 17, 2024"
unix: "1723925373"
type: "engineering"
status: "done"
---

# Inverted Pendulum Project Log #1

Work-in-progress living document

<img class="largeimg" src="media/inverted_pendulum_parts.jpg" alt="Inverted pendulum supplies">

<div class="centerelement">2020 aluminum extrusion gantry & parts</div>

## Inspiration

Having recently studied robotics in greater depth, I wanted to begin a project that would apply my knowledge of control theory--the science of making machinery bend to your will to using sensors and physics.

This led me to the perfect choice--an [inverted pendulum](https://en.wikipedia.org/wiki/Inverted_pendulum). It's a wonderful Renaissance engineering challenge, featuring a bit of everything: mechanical design, motor control, sensors, and simulation.

For inspiration on how to make this happen, I looked to others' previous attempts:

* [Philippe Francois](https://www.youtube.com/playlist?list=PLR8PgRVxI3_eJRzC2vmJDue801VbdpnOU) implemented [CTMS' wonderfully-detailed inverted pendulum model](https://ctms.engin.umich.edu/CTMS/index.php?example=InvertedPendulum&section=SystemModeling).
* Ian Carey (nice site btw) had a very helpful [bill of materials](https://iancarey.ie/projects/invertedpendulum), pointing me to the widely-used GT2 timing belt (same as most 3D printers!) as a drive mechanism.

## Bill of Materials

<table>
    <tr>
        <th>Part</th>
        <th>Quantity</th>
        <th>Link</th>
    </tr>
    <tr>
        <td>42x42x23mm Nema 17 Stepper Motor</td>
        <td>1</td>
        <td><a href="https://www.amazon.com/dp/B07PMWQ21T">Amazon</a></td>
    </tr>
    <tr>
        <td>A4988 Stepper Motor Driver</td>
        <td>1</td>
        <td><a href="https://www.digikey.com/en/products/detail/pololu-corporation/1182/10450403">DigiKey</a></td>
    </tr>
    <tr>
        <td>400mm 2020 Aluminum Extrusion</td>
        <td>1</td>
        <td><a href="https://www.amazon.com/dp/B0CYH2PDFL">Amazon</a></td>
    </tr>
    <tr>
        <td>2020 V-Slot Gantry</td>
        <td>1</td>
        <td><a href="https://www.amazon.com/dp/B09B396WH9">Amazon</a></td>
    </tr>
    <tr>
        <td>AS5600 Magnetic Encoder</td>
        <td>1</td>
        <td><a href="https://www.amazon.com/dp/B09LMB3PTZ">Amazon</a></td>
    </tr>
    <tr>
        <td>GT2 Timing Belt + Timing Pulley</td>
        <td>1</td>
        <td><a href="https://www.amazon.com/dp/B08SMFM3Z6">Amazon</a></td>
    </tr>
    <tr>
        <td>625-2RS Ball Bearing</td>
        <td>2</td>
        <td><a href="https://www.amazon.com/dp/B07TNNX9YX">Amazon</a></td>
    </tr>
    <tr>
        <td>SPST Limit Switch</td>
        <td>1</td>
        <td>N/A</td>
    </tr>
    <tr>
        <td>Arduino Uno Rev3</td>
        <td>1</td>
        <td><a href="https://store.arduino.cc/products/arduino-uno-rev3">Arduino</a></td>
    </tr>
</table>



