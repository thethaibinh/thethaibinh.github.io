---
layout: page
title: About
permalink: /about/
---

<style>
.exp-item { margin: 0 0 0.8rem 0; border-left: 2px solid #e0e0e0; padding-left: 0.8rem; }
.exp-item > summary {
  cursor: pointer;
  list-style: none;
  padding: 0.3rem 0;
  outline: none;
}
.exp-item > summary::-webkit-details-marker { display: none; }
.exp-item > summary::before {
  content: '▶';
  display: inline-block;
  margin-right: 0.5em;
  font-size: 0.7em;
  color: #888;
  transition: transform 0.2s ease;
  vertical-align: middle;
}
.exp-item[open] > summary::before { transform: rotate(90deg); }
.exp-title {
  font-size: 1.15em;
  font-weight: 600;
  line-height: 1.4;
}
.exp-meta {
  display: block;
  margin-top: 0.25em;
  margin-left: 1.6em;
  color: #777;
  font-size: 0.92em;
}
.exp-body { margin: 0.6em 0 0.6em 1.6em; }
</style>

Binh Nguyen is a Robotics Scientist and Tech Lead with over ten years of experience across aerospace, defence, and commercial robotics, building safety-critical autonomous platforms from concept through deployment. His end-to-end technical leadership spans perception, planning, control, and digital-twin infrastructure, with a track record of leading multidisciplinary teams to deliver resilient autonomous systems. 

He currently leads system development for a decentralised drone swarm framework for Defence applications at [UNSW Canberra](https://research.unsw.edu.au/people/mr-binh-nguyen), owning outcomes end-to-end from architecture through integration and field deployment.

---

## :mortar_board: Education

**Doctor of Philosophy** | Robotics & AI  
[Federation University Australia](https://www.federation.edu.au/), Churchill, Victoria, Australia  
May 2022 – Oct 2025  
Thesis recommended for a **Dean's Excellence Award** by an independent external examiner. [[Examiner Report]](/assets/pdf/examiner-report.pdf)

**Bachelor of Engineering (Honours)** | Electronics & Communication Engineering  
[Hanoi University of Science and Technology (HUST)](https://hust.edu.vn/en/), Hanoi, Vietnam  
2012 – 2017  
[#1 in Vietnam](https://hust.edu.vn/en/quality-assurance/university-ranking/scimago-217801.html) during 2012–2018 by Scimago Institutions Rankings.

---

## :briefcase: Experience

<details class="exp-item">
<summary><span class="exp-title">Research Associate | Technical Lead @ <a href="https://research.unsw.edu.au/people/mr-binh-nguyen">UNSW Canberra</a></span><span class="exp-meta">Canberra, ACT, Australia (Full-time | On-site)<br>July 2025 - Present</span></summary>
<div class="exp-body" markdown="1">

- **Leading systems development** for a decentralised drone swarm framework for [Defence applications](https://dtb.solutions/news/announcement/akula-tech-and-unsw-team-up-on-autonomous-adaptive-swarm-intelligence-project/), with end-to-end responsibility from architecture through integration, testing, deployment, and handover to industry stakeholders.
  - Architected a **modular, scalable software stack using ROS2**, enabling reusable integration across navigation, perception, communication, and task allocation subsystems with CI/CD pipelines from simulation to real hardware.
  - Built and maintained a **full-stack simulation infrastructure** (digital twin) based on ROS2 and NVIDIA Isaac Sim for development, integration testing, and validation, analogous to a flatsat environment.
  - **Leading cross-discipline integration** across embedded software, hardware, sensor payloads, localisation systems, and communication links, ensuring end-to-end validation through ground and flight testing.
  - Designed swarm testing scenarios, operational safety protocols, and human-swarm interaction interfaces; **mentoring** Defence undergraduate students on swarm simulation research.
- **Key Achievements**:
  - Designed, procured, built, and successfully flight-tested a [complete quadrotor swarm platform from scratch within three months]({% post_url 2025-07-01-drone-swarming-digital-twin %}), demonstrating rapid iterative build-test-refine cycles.
  - Delivered a [full-stack ROS2-based simulation and digital twin infrastructure]({% post_url 2025-07-01-drone-swarming-digital-twin %}) supporting seamless CI/CD from simulation onto real-world hardware.
  - Obtained CASA certifications ([RePL]({% post_url 2025-09-15-casa-certification %}), [AROC]({% post_url 2025-09-15-casa-certification %})) on first attempt.

</div>
</details>

<details class="exp-item">
<summary><span class="exp-title">Research Associate | Technical Lead @ <a href="https://www.federation.edu.au/about/news/news/ai-tech-to-enable-real-time-koala-detection-in-forestry-operations/">Federation University Australia</a></span><span class="exp-meta">Churchill, Victoria, Australia (Part-time | On-site)<br>June 2024 - June 2025</span></summary>
<div class="exp-body" markdown="1">

- **Led end-to-end architecture** for a [multi-sensor tracking system]({% post_url 2024-06-01-thermal-koala-detection %}) to protect koalas during forestry operations in Victoria, owning system design and cross-discipline integration across mechanical, electrical, and software teams, from specification through field qualification.
  - Specified, procured, and integrated the complete sensor-actuator chain: thermal cameras, laser range finders, gimbal systems, embedded controllers, and GNSS modules, **validated through lab and field testing**.
  - Developed **telemetry and command interfaces** for real-time thermal video streaming and target data exchange between onboard systems and the ground control station.
  - Developed gimbal control algorithms, AI-powered object detection, and target localisation through **sensor fusion** (laser + GNSS).
- **Achievement**: Delivered a [complete integrated tracking system]({% post_url 2024-06-01-thermal-koala-detection %}) with autonomous target following and real-time telemetry, successfully qualified through field testing at an operational plantation.

</div>
</details>

<details class="exp-item">
<summary><span class="exp-title">Embedded Software Engineer @ <a href="https://swoop.aero/">Swoop Aero</a></span><span class="exp-meta">Melbourne, Australia (Full-time | Hybrid)<br>Nov 2022 - June 2023</span></summary>
<div class="exp-body" markdown="1">

- Developing **mission-critical flight software** for [production aerial drone platforms](https://swoop.aero/solutions/) (1.6M+ items delivered, 6.0M+ people served globally) on RTOS/Embedded Linux. Conducting R&D for smart flight features with rapid iterative development cycles.
- **Achievement**: Delivered flight software for [vision-based autonomous takeoff and landing on moving platforms]({% post_url 2023-06-01-kite-swoop-aero %}) (e.g., ship decks), integrating real-time sensor processing, state estimation, and **autonomous decision-making under dynamic conditions**.

</div>
</details>

<details class="exp-item">
<summary><span class="exp-title">PhD Candidate | Robotics & AI @ <a href="https://www.federation.edu.au/">Federation University Australia</a></span><span class="exp-meta">Churchill, Victoria, Australia (Full-time | On-site)<br>May 2022 - June 2025</span></summary>
<div class="exp-body" markdown="1">

- **Research Focus**: Developed novel **real-time GNC algorithms** for autonomous aerial navigation under sensor uncertainty, validated through extensive **simulation-based testing** with iterative design-build-test-refine cycles. Research Portfolio: [thethaibinh.github.io/publications](https://thethaibinh.github.io/publications/)
- **Achievements**:
  - Published research in IEEE Robotics and Automation Letters (ranked #1 in Robotics by [Google Scholar](https://scholar.google.com.au/citations?view_op=top_venues&hl=en&vq=eng_robotics)).
  - Established the [Intelligent Drone Laboratory]({% post_url 2022-05-01-intelligent-drone-lab %}), the first and only indoor flight facility at Federation University, from concept to fully operational research infrastructure.

</div>
</details>

<details class="exp-item">
<summary><span class="exp-title">Autopilot Lead Engineer @ <a href="https://thethaibinh.github.io/experience/2021/12/31/hera-quadrotor.html">Realtime Robotics</a></span><span class="exp-meta">Vietnam (Full-time | Hybrid)<br>Jan 2022 - August 2022</span></summary>
<div class="exp-body" markdown="1">

- **Led a multidisciplinary team** (software, hardware, operations) to deliver an AI-powered vision-based navigation and object localisation system for UAVs **from concept through integration and deployment**, for agricultural applications and [search-and-rescue operations]({% post_url 2022-01-01-hera-quadrotor %}).

</div>
</details>

<details class="exp-item">
<summary><span class="exp-title">Autopilot Software Developer | Flight Simulation Lead @ <a href="https://viettelaerospace.vn/en">Viettel Aerospace Institute</a> & <a href="https://viettelhightech.vn/en/category-product/unmanned-aircraft">Viettel High Tech</a></span><span class="exp-meta">Hanoi, Vietnam (Full-time | On-site)<br>August 2017 - January 2022</span></summary>
<div class="exp-body" markdown="1">

- **Responsibilities**:
  - Developed **real-time flight software in C/C++** for multiple vehicle configurations across product generations, including **GNC algorithms** (guidance, navigation, control), motor control, and EKF-based state estimation (AHRS and GNSS/INS navigation).
  - Implemented **telemetry, command, and data handling** systems including real-time data logging, ground control station communication, and remote software configuration.
  - Led development of **FDIR (Fault Detection, Isolation and Response)** logic for autonomous recovery from vehicle anomalies including GNSS jamming/outage, communication loss, and sensor failures.
  - Owned the **SIL/HIL simulation infrastructure** for flight software development and testing across all vehicle configurations, using X-Plane with realistic visualisation.
  - Created all vehicle **digital-twin models** used for real-time testing and to inform iterative airframe and system design.
- **Achievements**:
  - Delivered a complete **production flight software stack** with advanced autonomy features, including VTOL-to-Fixed-wing transition control and **autonomous FDIR** for critical scenarios such as GNSS jamming, sensor failure, and communication loss.
  - Delivered digital-twin models and flight software for [**all vehicle configurations across five years** (2017–2022)]({% post_url 2017-08-11-viettel %}), including pan-tilt gimbal/tracker, Quadrotor, VTOL QuadPlane, Fixed-wing, Folded-wing, and Launcher/Jet-assisted take-off vehicles across all product versions.
  - Built a complete **SIL/HIL simulation infrastructure** from scratch, establishing the development and testing environment for all flight software across the organisation.

</div>
</details>

<details class="exp-item">
<summary><span class="exp-title">Research Assistant | UAV Team Lead @ <a href="https://research.hust.edu.vn/seee-lab-aerospace-electronics-lab">ASE Laboratory, HUST</a></span><span class="exp-meta">Hanoi, Vietnam (Part-time | Hybrid)<br>May 2014 - January 2022</span></summary>
<div class="exp-body" markdown="1">

- **Responsibilities**:
  - Led research on stability and **GNC algorithms** for various aerial vehicle configurations.
  - Designed embedded systems; full-stack software and electronics development for [IoT-SCADA applications]({% post_url 2014-06-01-multirotor-simulator %}#2016---iot-scada-system).
  - **Mentored** junior researchers on aerial systems, embedded development, and scientific writing.
- **Achievements**:
  - An open-source **real-time simulation system** based on X-Plane and Ardupilot for VTOL QuadPlane with [autonomous precision landing on moving platforms]({% post_url 2014-06-01-multirotor-simulator %}#2019---autonomous-landing-on-a-moving-ship--vtol-quadplane).
  - An open-source **real-time simulation system** based on MATLAB/Simulink with GNC algorithms for [multirotor aerial vehicles]({% post_url 2014-06-01-multirotor-simulator %}#2015---real-time-3d-simulator-based-on-matlabsimulink-for-multirotor).

</div>
</details>

---

## :wrench: Engineering Skills

- **Simulation & Virtual Validation:** SIL/HIL testing infrastructure design and deployment; digital-twin development (X-Plane, NVIDIA Isaac Sim, Unity, Gazebo, MATLAB/Simulink); CI/CD validation pipelines; test automation; systematic failure mode analysis
- **Autonomous System Architecture:** Full-stack understanding of perception, planning, control, and vehicle integration; system-level validation across subsystem interactions; design for testability
- **Software & Middleware:** ROS/ROS2 (modular architecture, multi-subsystem integration), PX4, Ardupilot; Python/C/C++ on RTOS and Embedded Linux; real-time deterministic systems
- **Autonomy & Control:** Guidance, navigation and control algorithms; EKF-based state estimation (AHRS, INS/GNSS); trajectory planning; FDIR; VTOL transition control; motor/gimbal control
- **Sensing & Perception:** Depth cameras (Intel RealSense, OAK-D), thermal cameras, LiDAR, laser range finders, RTK-GNSS; OpenCV, YOLO, FFmpeg, GStreamer
- **Communication & Telemetry:** Telemetry and command interfaces, data logging, ground control station integration; MAVLink, CAN, SPI, I2C, UART

---

## :trophy: Professional Certifications

- Remote Pilot Licence ([RePL]({% post_url 2025-09-15-casa-certification %})) & Aeronautical Radio Operator Certificate ([AROC]({% post_url 2025-09-15-casa-certification %})), issued by Civil Aviation Safety Authority (2025).

---

## :books: Selected Publications

All journal articles are Q1 and all first-authored without other student co-authors. See [Google Scholar](https://scholar.google.com/citations?user=8osTCJEAAAAJ) · [ORCID](https://orcid.org/0000-0003-2942-9014) · [IEEE](https://ieeexplore.ieee.org/author/316717000701112) for the full list.

1. **Binh Nguyen**, et al., "[Non-Conservative Efficient Collision Checking and Depth Noise-Awareness for Trajectory Planning](https://ieeexplore.ieee.org/document/11037478)," ***IEEE Robotics and Automation Letters***, vol. 10, no. 8, pp. 7859–7866, Aug. 2025. (Ranked #1 in Robotics by [Google Scholar Metrics](https://scholar.google.com.au/citations?view_op=top_venues&hl=en&vq=eng_robotics); invited to present at **ICRA 2026**).

2. **Binh Nguyen**, et al., "[Online State-to-State Time-Optimal Trajectory Planning for Quadrotors in Unknown Cluttered Environments](https://ieeexplore.ieee.org/document/10556839)," ***Proc. 2024 Int. Conf. Unmanned Aircraft Systems (ICUAS)***, pp. 309–316, 2024.

3. **Binh Nguyen**, et al., "[Depth-based Sampling and Steering Constraints for Memoryless Local Planners](https://link.springer.com/article/10.1007/s10846-023-01971-7)," ***Journal of Intelligent & Robotic Systems***, vol. 109, no. 11, p. 46, 2023. (Ranked #18 in Robotics by [Google Scholar Metrics](https://scholar.google.com.au/citations?view_op=top_venues&hl=en&vq=eng_robotics)).

---

## :rocket: Featured Projects

- **[ROS2 Swarming Digital Twin]({% post_url 2025-07-01-drone-swarming-digital-twin %})**: Full-stack simulation and digital twin system with CI/CD validation pipelines onto real hardware
- **[Fly-by-Voice]({% post_url 2026-01-31-vlm-guided-navigation %})**: VLM-powered autonomous navigation with natural language command interfaces and deterministic safety guarantees
- **[Brover]({% post_url 2025-06-01-building-brover %})**: Autonomous ground robot with multimodal sensing (RGB-D, thermal) and AI-powered interface (NVIDIA Academic Grant ~$25K AUD)
- **[Autonomous Target Tracking]({% post_url 2022-01-01-hera-quadrotor %}#tracking-ground-vehicle-by-quadrotor)**: Detection and tracking of moving ground targets, validated through simulation-to-deployment pipelines
- **[Precision Landing on Moving Platforms]({% post_url 2014-06-01-multirotor-simulator %}#2019---autonomous-landing-on-a-moving-ship--vtol-quadplane)**: Vision-based autonomous landing system

---

## :moneybag: Grants

- **[NVIDIA Academic Grant]({% post_url 2026-03-14-nvidia-academic-grant %})** (2026) - Unrestricted gift to UNSW in support of the Brover project: **32K A100 GPU-Hours on Brev** and **2× Jetson AGX Orin Dev Kits**
