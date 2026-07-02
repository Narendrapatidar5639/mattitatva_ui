import { useMemo, useState } from "react";
import { Eye, FileText, Search } from "lucide-react";
import { FONT_DISPLAY, FONT_LABEL, G, PRIMARY, PRIMARY_LIGHT } from "../constants/theme";
import { adminFieldClass, AdminCard, AdminPageHeader, StatusBadge } from "./components/ui";
import { MOCK_ORDERS } from "./mockData";
import type { AdminOrder, OrderStatus } from "./types";

const STATUS_OPTIONS: OrderStatus[] = ["Pending", "Shipped", "Delivered"];

function statusTone(status: OrderStatus): "green" | "blue" | "gray" {
  switch (status) {
    case "Delivered": return "green";
    case "Shipped": return "blue";
    default: return "gray";
  }
}

export function OrderManagement() {
  const [orders, setOrders] = useState<AdminOrder[]>(MOCK_ORDERS);
  const [query, setQuery] = useState("");
  const [invoiceOrder, setInvoiceOrder] = useState<AdminOrder | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q)
    );
  }, [orders, query]);

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div>
      <AdminPageHeader
        title="Order Management"
        subtitle="Track orders, update fulfillment status, and view invoices."
      />

      <AdminCard className="p-4 mb-6">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={`${adminFieldClass()} pl-10`}
            placeholder="Search by order ID, customer, or email…"
          />
        </div>
      </AdminCard>

      <AdminCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-gray-400 border-b bg-gray-50/80" style={{ borderColor: G[100] }}>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Placed</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-green-50/30" style={{ borderColor: G[50] }}>
                  <td className="px-4 py-3 font-bold text-gray-800">{order.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{order.customer}</p>
                    <p className="text-xs text-gray-400">{order.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{order.items}</td>
                  <td className="px-4 py-3 font-semibold">₹{order.total.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{order.placedAt}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value as OrderStatus)}
                      className="text-xs font-bold rounded-lg border px-2 py-1.5 outline-none focus:ring-2 focus:ring-green-100"
                      style={{ borderColor: G[200] }}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setInvoiceOrder(order)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                      style={{ background: PRIMARY }}
                    >
                      <FileText size={14} /> Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setInvoiceOrder(null)}>
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-labelledby="invoice-title"
          >
            <div className="p-6 border-b" style={{ borderColor: G[100], background: PRIMARY_LIGHT }}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1" style={{ fontFamily: FONT_LABEL }}>Maati Tatva Agro</p>
              <h2 id="invoice-title" className="text-2xl font-bold text-gray-900" style={{ fontFamily: FONT_DISPLAY }}>Tax Invoice</h2>
              <p className="text-sm text-gray-600 mt-1">{invoiceOrder.id}</p>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase mb-1">Bill To</p>
                  <p className="font-semibold">{invoiceOrder.customer}</p>
                  <p className="text-gray-500">{invoiceOrder.address}</p>
                  <p className="text-gray-500">{invoiceOrder.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase mb-1">Details</p>
                  <p>Date: {invoiceOrder.placedAt}</p>
                  <p>Payment: {invoiceOrder.payment}</p>
                  <StatusBadge label={invoiceOrder.status} tone={statusTone(invoiceOrder.status)} />
                </div>
              </div>
              <div className="border rounded-xl overflow-hidden" style={{ borderColor: G[100] }}>
                <table className="w-full">
                  <thead className="bg-gray-50 text-[10px] uppercase text-gray-400">
                    <tr>
                      <th className="text-left px-4 py-2">Description</th>
                      <th className="text-right px-4 py-2">Qty</th>
                      <th className="text-right px-4 py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t" style={{ borderColor: G[50] }}>
                      <td className="px-4 py-3">Maati Tatva Products (assorted)</td>
                      <td className="px-4 py-3 text-right">{invoiceOrder.items}</td>
                      <td className="px-4 py-3 text-right font-semibold">₹{invoiceOrder.total.toLocaleString("en-IN")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center pt-2 border-t font-bold" style={{ borderColor: G[100] }}>
                <span>Grand Total</span>
                <span style={{ color: PRIMARY }}>₹{invoiceOrder.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-2" style={{ borderColor: G[100] }}>
              <button
                type="button"
                onClick={() => setInvoiceOrder(null)}
                className="px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100"
              >
                Close
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
                style={{ background: PRIMARY }}
              >
                <Eye size={16} /> Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderManagement;
