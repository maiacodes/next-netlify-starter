// 2026 Matter Thread Border Router comparison dataset.
// Specs are compiled from each vendor's published documentation and Matter/Thread
// Group certifications as of Q2 2026. "childCapacity" is the practical per-router
// child-device limit reported in firmware; mesh networks scale higher by chaining
// routers. Power numbers are typical wall draw with the device idle on Wi-Fi/Ethernet.

const borderRouters = [
  {
    id: "apple-tv-4k-2022",
    vendor: "Apple",
    model: "Apple TV 4K (3rd gen, Wi-Fi + Ethernet)",
    silicon: "NXP K32W0x",
    threadVersion: "1.4",
    matterControllerRole: "Primary (HomeKit / Matter)",
    childCapacity: 250,
    meshStability: 5,
    idlePowerW: 1.9,
    activePowerW: 6.5,
    ethernet: true,
    poe: false,
    openThreadOpenSource: false,
    multiAdminShareFabric: true,
    releaseYear: 2022,
    firmware: "tvOS 18.4",
    notes:
      "Best-in-class iCloud fabric sharing; exposes Thread credentials to other Apple TVs/HomePods automatically.",
  },
  {
    id: "homepod-mini",
    vendor: "Apple",
    model: "HomePod mini",
    silicon: "NXP K32W0x",
    threadVersion: "1.3",
    matterControllerRole: "Primary (HomeKit / Matter)",
    childCapacity: 32,
    meshStability: 3,
    idlePowerW: 1.4,
    activePowerW: 5.2,
    ethernet: false,
    poe: false,
    openThreadOpenSource: false,
    multiAdminShareFabric: true,
    releaseYear: 2020,
    firmware: "audioOS 18.4",
    notes:
      "Wi-Fi-only backhaul limits headroom; useful as a leaf border router for room-scale coverage.",
  },
  {
    id: "nest-hub-2",
    vendor: "Google",
    model: "Nest Hub (2nd gen)",
    silicon: "Silicon Labs EFR32MG12",
    threadVersion: "1.3",
    matterControllerRole: "Primary (Google Home)",
    childCapacity: 64,
    meshStability: 3,
    idlePowerW: 2.6,
    activePowerW: 7.4,
    ethernet: false,
    poe: false,
    openThreadOpenSource: true,
    multiAdminShareFabric: true,
    releaseYear: 2021,
    firmware: "Fuchsia 18",
    notes:
      "Shares Thread network with Nest Wifi Pro; fabric handoff to non-Google ecosystems still requires manual pairing.",
  },
  {
    id: "nest-wifi-pro",
    vendor: "Google",
    model: "Nest Wifi Pro (6E)",
    silicon: "Silicon Labs EFR32MG24",
    threadVersion: "1.4",
    matterControllerRole: "Primary (Google Home)",
    childCapacity: 128,
    meshStability: 4,
    idlePowerW: 5.8,
    activePowerW: 11.0,
    ethernet: true,
    poe: false,
    openThreadOpenSource: true,
    multiAdminShareFabric: true,
    releaseYear: 2022,
    firmware: "Google Home 3.10",
    notes:
      "Three-pack creates a synced Thread mesh over Wi-Fi 6E backhaul; strongest Google-side option for large homes.",
  },
  {
    id: "echo-hub",
    vendor: "Amazon",
    model: "Echo Hub",
    silicon: "Silicon Labs MGM210L",
    threadVersion: "1.3",
    matterControllerRole: "Primary (Alexa)",
    childCapacity: 128,
    meshStability: 3,
    idlePowerW: 3.2,
    activePowerW: 8.1,
    ethernet: true,
    poe: true,
    openThreadOpenSource: false,
    multiAdminShareFabric: true,
    releaseYear: 2024,
    firmware: "FireOS 9",
    notes:
      "PoE option makes it the only mainstream wall-mount border router; Thread credentials shared across Echo (4th gen) and Echo Show 8/10.",
  },
  {
    id: "echo-4",
    vendor: "Amazon",
    model: "Echo (4th gen)",
    silicon: "Silicon Labs MGM12P",
    threadVersion: "1.3",
    matterControllerRole: "Primary (Alexa)",
    childCapacity: 64,
    meshStability: 2,
    idlePowerW: 3.8,
    activePowerW: 9.4,
    ethernet: false,
    poe: false,
    openThreadOpenSource: false,
    multiAdminShareFabric: true,
    releaseYear: 2020,
    firmware: "FireOS 8",
    notes:
      "Reliable as a Thread leaf; high idle draw makes it a poor choice if you already run an Echo Hub.",
  },
  {
    id: "ha-yellow",
    vendor: "Nabu Casa",
    model: "Home Assistant Yellow (CM4 + MGM210P)",
    silicon: "Silicon Labs MGM210P",
    threadVersion: "1.4",
    matterControllerRole: "Primary (HA Matter Server, OTBR)",
    childCapacity: 250,
    meshStability: 5,
    idlePowerW: 3.4,
    activePowerW: 7.2,
    ethernet: true,
    poe: true,
    openThreadOpenSource: true,
    multiAdminShareFabric: true,
    releaseYear: 2023,
    firmware: "HAOS 13.2 / OTBR 2.7",
    notes:
      "Runs upstream OpenThread Border Router; full fabric sharing with Apple/Google/Amazon through HA's Thread credential broker.",
  },
  {
    id: "ha-skyconnect",
    vendor: "Nabu Casa",
    model: "Home Assistant Connect ZBT-1 (SkyConnect)",
    silicon: "Silicon Labs EFR32MG21",
    threadVersion: "1.4",
    matterControllerRole: "Primary (HA Matter Server, OTBR)",
    childCapacity: 200,
    meshStability: 4,
    idlePowerW: 0.6,
    activePowerW: 1.4,
    ethernet: false,
    poe: false,
    openThreadOpenSource: true,
    multiAdminShareFabric: true,
    releaseYear: 2023,
    firmware: "OTBR 2.7",
    notes:
      "USB radio attached to any HA host; lowest idle wattage in the comparison and supports concurrent Zigbee with multi-PAN firmware.",
  },
  {
    id: "homey-pro-2023",
    vendor: "Athom",
    model: "Homey Pro (Early 2023)",
    silicon: "Silicon Labs MGM240P",
    threadVersion: "1.4",
    matterControllerRole: "Primary (Homey Matter)",
    childCapacity: 150,
    meshStability: 4,
    idlePowerW: 2.4,
    activePowerW: 5.8,
    ethernet: true,
    poe: false,
    openThreadOpenSource: false,
    multiAdminShareFabric: true,
    releaseYear: 2023,
    firmware: "Homey 12.1",
    notes:
      "Bridges Z-Wave, Zigbee, Thread and Matter on one box; fabric sharing with Apple and Google is bidirectional since v12.",
  },
  {
    id: "aqara-m3",
    vendor: "Aqara",
    model: "Hub M3",
    silicon: "Silicon Labs EFR32MG24",
    threadVersion: "1.4",
    matterControllerRole: "Primary + Bridge (Matter Controller + Bridge)",
    childCapacity: 128,
    meshStability: 4,
    idlePowerW: 2.1,
    activePowerW: 5.0,
    ethernet: true,
    poe: false,
    openThreadOpenSource: false,
    multiAdminShareFabric: true,
    releaseYear: 2024,
    firmware: "Aqara 4.3",
    notes:
      "Only mainstream hub that also bridges legacy Zigbee devices into Matter while acting as a Thread Border Router.",
  },
];

export const meshStabilityLabel = (score) => {
  switch (score) {
    case 5:
      return "Excellent";
    case 4:
      return "Strong";
    case 3:
      return "Good";
    case 2:
      return "Fair";
    default:
      return "Limited";
  }
};

export const recommendedCombos = [
  {
    id: "apple-first",
    title: "Apple-first household",
    devices: ["Apple TV 4K (3rd gen)", "HomePod mini ×2", "Home Assistant Yellow"],
    why: "Apple TV anchors the HomeKit fabric on Ethernet, HomePod minis fill room coverage, and HA Yellow lets you share Thread credentials with Google/Alexa without re-pairing accessories.",
    capacity: "~430 Thread children, 3 redundant border routers",
  },
  {
    id: "google-first",
    title: "Google / Nest household",
    devices: ["Nest Wifi Pro (3-pack)", "Nest Hub (2nd gen)", "SkyConnect on a NUC"],
    why: "Nest Wifi Pro provides a Wi-Fi 6E + Thread mesh; SkyConnect bolts on an OTBR so non-Google devices (Eve, Aqara) join cleanly via Home Assistant.",
    capacity: "~512 Thread children, 5 border routers",
  },
  {
    id: "alexa-first",
    title: "Amazon / Alexa household",
    devices: ["Echo Hub (PoE)", "Echo (4th gen)", "Home Assistant Yellow"],
    why: "Echo Hub on PoE acts as the wall-mounted hub; HA Yellow runs the OTBR that Alexa's Thread network can hand off to, so Apple/Google controllers can co-commission devices.",
    capacity: "~370 Thread children, 3 border routers",
  },
  {
    id: "power-user",
    title: "Multi-controller power user",
    devices: [
      "Home Assistant Yellow",
      "Apple TV 4K (3rd gen)",
      "Nest Wifi Pro",
      "Homey Pro (Early 2023)",
    ],
    why: "Four primary controllers on one Thread mesh. HA Yellow is the source of truth for Thread credentials; the other three commission to the same fabric using Matter multi-admin.",
    capacity: "~700 Thread children, 4 vendor fabrics in sync",
  },
];

export default borderRouters;
