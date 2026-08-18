---
title: "Open-Source Hardware Bible"
description: "Standardization of high-quality components keeps open-source hardware accessible and reproducible for years to come."
type: note
date: 2026-03-30
tags: [hardware]
source: "Personal compilation from ISO/DIN/ANSI standards and vendor documentation (McMaster-Carr, Misumi, JST, Same Sky Devices, TI)"
status: wip
legacyPath: ["/self-study/hardware"]
---

# Open-Source Hardware Bible

Poor part selection is a leading factor in the death of open-source hardware projects. With [vendor lock-in](https://en.wikipedia.org/wiki/Vendor_lock-in) and country-specific availability, it only takes a few changes for parts to become inaccessible.

Avoiding these pitfalls requires [open standards](https://en.wikipedia.org/wiki/Open_standard) and parts which are:

* Internationally standardized
* Often metric (depends on industry)
* Inexpensive
* In widespread use

For bearings, extrusions, belts, gears, etc., here are my opinionated recommendations, based on [ISO](https://www.iso.org/standards.html), [ANSI](https://www.ansi.org/about/introduction), [ASTM](https://en.wikipedia.org/wiki/ASTM_International), [CEN](https://www.cencenelec.eu/european-standardization/european-standards/), and [UTS](https://en.wikipedia.org/wiki/Unified_Thread_Standard) standards for common mechatronics components. Datasheets included where possible.

CAD Tip: Install the SOLIDWORKS extensions for [McMaster-Carr](https://www.mcmaster.com/solidworksaddin/) and [Misumi](https://us.misumi-ec.com/service/promotion/rapiddesign/) (Misumi install is rather bloated) to import their standardized components into your assembly.

### Fasteners:

- DIN 912 TODO
    - [ref page / ISO 4762](https://www.fasteners.eu/standards/iso/4762/)
    - [ref page / DIN 912 (old)](https://www.aramfix.com/content/files/d912caill/datasheet%20din%20912.pdf)
- ISO 7380-1 TODO
    - [ref page](https://www.westfieldfasteners.co.uk/Standards/ScrewBolt-SHBtn-M.pdf)

### Hand Tools:

- Hex Bit ISO 1173 TODO
    - Style C & D 6.3, both quick-change compatible
- Crimper SN-58B-style TODO
    - exchangeable chucks

### Extrusion:

- Extrusion T-Nuts TODO
    - [ref page, Misumi EC Extrusion T-Nuts Guide](https://us.misumi-ec.com/pdf/fa/2010/p2261.pdf)

### Lab Storage:

- [Durham Component Box](/posts/durham/)

### Cables:

- JST PH v. GH v. XH TODO
    - [JST PH ref page](https://www.jst.com/wp-content/uploads/2025/06/ePH.pdf)
    - [JST GH ref page](https://www.jst.com/wp-content/uploads/2025/06/eGH.pdf)
    - [JST XH ref page](https://www.jst.com/wp-content/uploads/2025/06/eXH.pdf)
- USB-C TODO

### Motor Components:

- NEMA TODO
- [AMT22 Rotary Sensor](https://www.sameskydevices.com/product/resource/amt22.pdf), Same Sky Devices
- DRV8302 TODO
    - [ref page](https://www.ti.com/product/DRV8302)

WORK IN PROGRESS

### Embedded Devices 3D Models:

TODO
- Arduino UNO R3
- ESP32-C3 DevKitC
- Jetson Orin Nano
