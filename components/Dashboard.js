import { useMemo, useState } from "react";
import borderRouters, {
  meshStabilityLabel,
  recommendedCombos,
} from "../data/borderRouters";
import styles from "./Dashboard.module.css";

const columns = [
  { key: "model", label: "Router", sortable: true, sortValue: (r) => r.model },
  {
    key: "threadVersion",
    label: "Thread",
    sortable: true,
    sortValue: (r) => parseFloat(r.threadVersion),
  },
  {
    key: "matterControllerRole",
    label: "Matter role",
    sortable: true,
    sortValue: (r) => r.matterControllerRole,
  },
  {
    key: "childCapacity",
    label: "Child capacity",
    sortable: true,
    sortValue: (r) => r.childCapacity,
  },
  {
    key: "meshStability",
    label: "Mesh stability",
    sortable: true,
    sortValue: (r) => r.meshStability,
  },
  {
    key: "idlePowerW",
    label: "Idle power",
    sortable: true,
    sortValue: (r) => r.idlePowerW,
  },
  {
    key: "activePowerW",
    label: "Active power",
    sortable: true,
    sortValue: (r) => r.activePowerW,
  },
  { key: "notes", label: "Notes", sortable: false },
];

const filters = [
  { id: "thread14", label: "Thread 1.4 only", test: (r) => r.threadVersion === "1.4" },
  {
    id: "capacity150",
    label: "150+ child capacity",
    test: (r) => r.childCapacity >= 150,
  },
  { id: "ethernet", label: "Wired Ethernet", test: (r) => r.ethernet },
  { id: "poe", label: "PoE-capable", test: (r) => r.poe },
  {
    id: "openthread",
    label: "Upstream OpenThread",
    test: (r) => r.openThreadOpenSource,
  },
];

function MeshBar({ score }) {
  const pips = [1, 2, 3, 4, 5];
  return (
    <span aria-label={`Mesh stability ${score} of 5`}>
      <span className={styles.meshBar}>
        {pips.map((p) => (
          <span
            key={p}
            className={`${styles.meshPip} ${
              p <= score ? styles.meshPipActive : ""
            }`}
          />
        ))}
      </span>
      {meshStabilityLabel(score)}
    </span>
  );
}

export default function Dashboard() {
  const [sortKey, setSortKey] = useState("childCapacity");
  const [sortDir, setSortDir] = useState("desc");
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (id) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const onSort = (key) => {
    const col = columns.find((c) => c.key === key);
    if (!col || !col.sortable) return;
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "model" ? "asc" : "desc");
    }
  };

  const rows = useMemo(() => {
    const needle = search.trim().toLowerCase();
    const activeTests = filters
      .filter((f) => activeFilters.includes(f.id))
      .map((f) => f.test);

    const filtered = borderRouters.filter((r) => {
      if (activeTests.some((t) => !t(r))) return false;
      if (!needle) return true;
      return (
        r.model.toLowerCase().includes(needle) ||
        r.vendor.toLowerCase().includes(needle) ||
        r.silicon.toLowerCase().includes(needle) ||
        r.matterControllerRole.toLowerCase().includes(needle)
      );
    });

    const col = columns.find((c) => c.key === sortKey);
    if (!col || !col.sortable) return filtered;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = col.sortValue(a);
      const bv = col.sortValue(b);
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [sortKey, sortDir, search, activeFilters]);

  return (
    <div className={styles.page}>
      <p className={styles.heroEyebrow}>Smart home infrastructure · 2026</p>
      <h1 className={styles.heroTitle}>
        Matter Thread Border Router comparison dashboard
      </h1>
      <p className={styles.heroSub}>
        Side-by-side specs for the Thread Border Routers shipping today: Thread
        1.3/1.4 support, per-router child device limits, cross-vendor mesh
        stability scoring, and typical wall-power draw. Sort any column, filter
        for the capabilities you need, and see which hardware combinations are
        recommended for multi-controller Matter setups.
      </p>

      <div className={styles.controls}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search vendor, model, silicon…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search border routers"
        />
        <div className={styles.toggleGroup} role="group" aria-label="Filters">
          {filters.map((f) => {
            const active = activeFilters.includes(f.id);
            return (
              <button
                key={f.id}
                type="button"
                className={`${styles.toggle} ${
                  active ? styles.toggleActive : ""
                }`}
                aria-pressed={active}
                onClick={() => toggleFilter(f.id)}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <span className={styles.count}>
          {rows.length} of {borderRouters.length} routers
        </span>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => {
                const isActive = sortKey === col.key;
                const indicator = col.sortable
                  ? isActive
                    ? sortDir === "asc"
                      ? "▲"
                      : "▼"
                    : "↕"
                  : "";
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={col.sortable ? styles.sortable : ""}
                    onClick={() => onSort(col.key)}
                    aria-sort={
                      isActive
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    {col.label}
                    {col.sortable && (
                      <span
                        className={`${styles.sortIndicator} ${
                          isActive ? styles.sortIndicatorActive : ""
                        }`}
                        aria-hidden="true"
                      >
                        {indicator}
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const capacityClass =
                r.childCapacity >= 150 ? styles.capacityOk : styles.capacityWarn;
              return (
                <tr key={r.id}>
                  <td className={styles.modelCell}>
                    <div className={styles.vendor}>{r.vendor}</div>
                    <div className={styles.modelName}>{r.model}</div>
                    <div className={styles.silicon}>{r.silicon}</div>
                  </td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        r.threadVersion === "1.4"
                          ? styles.badge14
                          : styles.badge13
                      }`}
                    >
                      {r.threadVersion}
                    </span>
                  </td>
                  <td>{r.matterControllerRole}</td>
                  <td className={`${styles.capacityCell} ${capacityClass}`}>
                    {r.childCapacity}
                  </td>
                  <td>
                    <MeshBar score={r.meshStability} />
                  </td>
                  <td>{r.idlePowerW.toFixed(1)} W</td>
                  <td>{r.activePowerW.toFixed(1)} W</td>
                  <td className={styles.notes}>{r.notes}</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className={styles.notes}>
                  No routers match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <section className={styles.combos}>
        <h2 className={styles.combosTitle}>
          Recommended hardware combinations for multi-controller Matter setups
        </h2>
        <p className={styles.combosLead}>
          Matter multi-admin lets a single accessory join several fabrics, but it
          only works reliably when at least one border router can share Thread
          credentials across ecosystems. These combinations cover the four
          patterns we see most often in 2026.
        </p>
        <div className={styles.comboGrid}>
          {recommendedCombos.map((combo) => (
            <article key={combo.id} className={styles.comboCard}>
              <h3 className={styles.comboTitle}>{combo.title}</h3>
              <div className={styles.comboCapacity}>{combo.capacity}</div>
              <ul className={styles.comboDevices}>
                {combo.devices.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className={styles.comboWhy}>{combo.why}</p>
            </article>
          ))}
        </div>
      </section>

      <p className={styles.footnote}>
        Capacity, power, and stability figures are aggregated from vendor
        documentation and Thread Group certifications as of Q2 2026. Mesh
        stability is a normalized 1–5 score derived from cross-vendor handoff
        latency in our lab.
      </p>
    </div>
  );
}
