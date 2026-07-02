import { useMemo, useState } from "react";
import { Clock, MapPin, Package, Plus, Truck, CheckCircle2 } from "lucide-react";
import { FONT_LABEL, G, PRIMARY, PRIMARY_LIGHT } from "../constants/theme";
import { adminFieldClass, AdminCard, AdminPageHeader, MetricCard, StatusBadge } from "./components/ui";
import { MOCK_PARTNERS, MOCK_PINCODES, MOCK_SHIPMENTS } from "./mockData";
import type { AdminShipment, PincodeZone, ShipmentStatus, ShippingPartner } from "./types";

const SHIPMENT_STATUSES: ShipmentStatus[] = ["Pending", "Dispatched", "In-Transit", "Delivered"];

function shipmentTone(status: ShipmentStatus): "green" | "amber" | "blue" | "gray" {
  switch (status) {
    case "Delivered": return "green";
    case "In-Transit": return "blue";
    case "Dispatched": return "amber";
    default: return "gray";
  }
}

export function Shipping() {
  const [shipments, setShipments] = useState<AdminShipment[]>(MOCK_SHIPMENTS);
  const [partners, setPartners] = useState<ShippingPartner[]>(MOCK_PARTNERS);
  const [pincodes, setPincodes] = useState<PincodeZone[]>(MOCK_PINCODES);
  const [newPincode, setNewPincode] = useState({ pincode: "", city: "", state: "", etaDays: 3 });

  const updateShipmentStatus = (id: string, status: ShipmentStatus) => {
    setShipments(prev =>
      prev.map(s =>
        s.id === id ? { ...s, status, updatedAt: new Date().toLocaleString("en-IN", { hour12: false }).replace(",", "") } : s
      )
    );
  };

  const updateTracking = (id: string, trackingId: string) => {
    setShipments(prev => prev.map(s => (s.id === id ? { ...s, trackingId } : s)));
  };

  const togglePartner = (id: string) => {
    setPartners(prev => prev.map(p => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  const togglePincode = (pincode: string) => {
    setPincodes(prev => prev.map(p => (p.pincode === pincode ? { ...p, available: !p.available } : p)));
  };

  const addPincode = () => {
    if (!newPincode.pincode.trim() || !newPincode.city.trim()) return;
    setPincodes(prev => [
      ...prev,
      {
        pincode: newPincode.pincode.trim(),
        city: newPincode.city.trim(),
        state: newPincode.state.trim() || "Maharashtra",
        available: true,
        etaDays: newPincode.etaDays,
      },
    ]);
    setNewPincode({ pincode: "", city: "", state: "", etaDays: 3 });
  };

  const activeCount = shipments.filter(s => s.status !== "Delivered").length;
  const deliveredCount = shipments.filter(s => s.status === "Delivered").length;
  const inTransitCount = shipments.filter(s => s.status === "In-Transit" || s.status === "Dispatched").length;

  const metrics = useMemo(
    () => ({
      active: activeCount,
      delivered: deliveredCount,
      inTransit: inTransitCount,
      partners: partners.filter(p => p.active).length,
    }),
    [activeCount, deliveredCount, inTransitCount, partners]
  );

  return (
    <div>
      <AdminPageHeader
        title="Shipping & Delivery"
        subtitle="Track shipments, manage delivery partners, update tracking IDs, and monitor shipping metrics."
        action={
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: PRIMARY_LIGHT, color: PRIMARY }}>
            <Truck size={14} /> {metrics.active} active
          </span>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Active Shipments" value={String(metrics.active)} icon={<Truck size={20} />} />
        <MetricCard label="In Transit" value={String(metrics.inTransit)} icon={<Package size={20} />} />
        <MetricCard label="Delivered" value={String(metrics.delivered)} icon={<CheckCircle2 size={20} />} />
        <MetricCard label="Active Partners" value={String(metrics.partners)} icon={<Clock size={20} />} />
      </div>

      <AdminCard className="p-5 mb-6">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4 flex items-center gap-2" style={{ fontFamily: FONT_LABEL }}>
          <Package size={16} style={{ color: PRIMARY }} /> Active Shipments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-gray-400 border-b" style={{ borderColor: G[100] }}>
                <th className="pb-3 pr-3">Shipment</th>
                <th className="pb-3 pr-3">Order</th>
                <th className="pb-3 pr-3">Customer</th>
                <th className="pb-3 pr-3">Partner</th>
                <th className="pb-3 pr-3">Tracking ID</th>
                <th className="pb-3 pr-3">Pincode</th>
                <th className="pb-3 pr-3">Status</th>
                <th className="pb-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map(shipment => (
                <tr key={shipment.id} className="border-b last:border-0 align-top" style={{ borderColor: G[50] }}>
                  <td className="py-3 pr-3 font-bold text-gray-800">{shipment.id}</td>
                  <td className="py-3 pr-3 text-gray-600">{shipment.orderId}</td>
                  <td className="py-3 pr-3 text-gray-600">{shipment.customer}</td>
                  <td className="py-3 pr-3 text-gray-600">{shipment.partner}</td>
                  <td className="py-3 pr-3 min-w-[140px]">
                    <input
                      value={shipment.trackingId}
                      onChange={e => updateTracking(shipment.id, e.target.value)}
                      className={`${adminFieldClass()} py-2 text-xs font-mono`}
                      placeholder="Enter tracking ID"
                    />
                  </td>
                  <td className="py-3 pr-3 text-gray-600">{shipment.pincode}</td>
                  <td className="py-3 pr-3">
                    <select
                      value={shipment.status}
                      onChange={e => updateShipmentStatus(shipment.id, e.target.value as ShipmentStatus)}
                      className="text-xs font-bold rounded-lg border px-2 py-1.5 outline-none focus:ring-2 focus:ring-green-100 mb-1"
                      style={{ borderColor: G[200] }}
                    >
                      {SHIPMENT_STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <StatusBadge label={shipment.status} tone={shipmentTone(shipment.status)} />
                  </td>
                  <td className="py-3 text-xs text-gray-400">{shipment.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AdminCard className="p-5">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4" style={{ fontFamily: FONT_LABEL }}>
            Delivery Partners & Rates
          </h2>
          <div className="space-y-3">
            {partners.map(partner => (
              <div
                key={partner.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border"
                style={{ borderColor: G[100], background: partner.active ? "#fff" : G[50] }}
              >
                <div>
                  <p className="font-bold text-gray-800">{partner.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Base ₹{partner.baseRate} · ₹{partner.perKgRate}/kg
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => togglePartner(partner.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                    partner.active ? "text-green-800" : "text-gray-500 bg-gray-200"
                  }`}
                  style={partner.active ? { background: PRIMARY_LIGHT } : undefined}
                >
                  {partner.active ? "Active" : "Inactive"}
                </button>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard className="p-5">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4 flex items-center gap-2" style={{ fontFamily: FONT_LABEL }}>
            <MapPin size={16} style={{ color: PRIMARY }} /> Pincode Availability
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            <input
              value={newPincode.pincode}
              onChange={e => setNewPincode(p => ({ ...p, pincode: e.target.value }))}
              className={adminFieldClass()}
              placeholder="Pincode"
            />
            <input
              value={newPincode.city}
              onChange={e => setNewPincode(p => ({ ...p, city: e.target.value }))}
              className={adminFieldClass()}
              placeholder="City"
            />
            <input
              value={newPincode.state}
              onChange={e => setNewPincode(p => ({ ...p, state: e.target.value }))}
              className={adminFieldClass()}
              placeholder="State"
            />
            <button
              type="button"
              onClick={addPincode}
              className="flex items-center justify-center gap-1 rounded-xl text-xs font-bold text-white"
              style={{ background: PRIMARY }}
            >
              <Plus size={14} /> Add
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {pincodes.map(zone => (
              <div
                key={zone.pincode}
                className="flex items-center justify-between gap-3 p-3 rounded-xl border"
                style={{ borderColor: G[100] }}
              >
                <div>
                  <p className="font-bold text-gray-800">{zone.pincode}</p>
                  <p className="text-xs text-gray-500">{zone.city}, {zone.state} · ETA {zone.etaDays}d</p>
                </div>
                <button
                  type="button"
                  onClick={() => togglePincode(zone.pincode)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    zone.available ? "text-green-800" : "text-red-700 bg-red-50"
                  }`}
                  style={zone.available ? { background: PRIMARY_LIGHT } : undefined}
                >
                  {zone.available ? "Available" : "Unavailable"}
                </button>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

export default Shipping;
