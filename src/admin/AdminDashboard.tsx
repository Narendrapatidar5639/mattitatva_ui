import { useMemo } from "react";
import { Link } from "react-router";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { AlertTriangle, IndianRupee, Package, ShoppingBag, Warehouse } from "lucide-react";
import { FONT_LABEL, G, PRIMARY, PRIMARY_LIGHT } from "../constants/theme";
import { AdminCard, AdminPageHeader, MetricCard, StatusBadge } from "./components/ui";
import { MOCK_INVENTORY, MOCK_ORDERS, SALES_CHART, VENDOR_CHART } from "./mockData";
import { ADMIN_ROUTES } from "./routes";

const PIE_COLORS = ["#246841", "#3d9a6b", "#7bc49e", "#b8ddc9"];

export function AdminDashboard() {
  const metrics = useMemo(() => {
    const totalSales = MOCK_ORDERS.reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = MOCK_ORDERS.filter(o => o.status === "Pending").length;
    const lowStock = MOCK_INVENTORY.filter(i => i.stock <= i.lowStockThreshold).length;
    const outOfStock = MOCK_INVENTORY.filter(i => !i.inStock || i.stock === 0).length;
    return {
      totalSales,
      orders: MOCK_ORDERS.length,
      pendingOrders,
      inventoryItems: MOCK_INVENTORY.length,
      lowStock,
      outOfStock,
      avgOrder: Math.round(totalSales / MOCK_ORDERS.length),
    };
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Dashboard Overview"
        subtitle="Overall sales, inventory status, and recent orders for Maati Tatva."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Total Sales"
          value={`₹${metrics.totalSales.toLocaleString("en-IN")}`}
          change="+12.4% vs last month"
          icon={<IndianRupee size={20} />}
        />
        <MetricCard
          label="Total Orders"
          value={String(metrics.orders)}
          change={`${metrics.pendingOrders} pending`}
          icon={<ShoppingBag size={20} />}
        />
        <MetricCard
          label="Inventory SKUs"
          value={String(metrics.inventoryItems)}
          change={`${metrics.lowStock} low stock`}
          icon={<Warehouse size={20} />}
        />
        <MetricCard
          label="Out of Stock"
          value={String(metrics.outOfStock)}
          change={metrics.outOfStock > 0 ? "Needs restock" : "All healthy"}
          icon={<AlertTriangle size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <AdminCard className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Sales Trend</h2>
            <span className="text-[10px] uppercase tracking-wider text-gray-400" style={{ fontFamily: FONT_LABEL }}>Last 6 months</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_CHART}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={G[100]} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: G[100] }} />
                <Area type="monotone" dataKey="sales" stroke={PRIMARY} fill="url(#salesFill)" strokeWidth={2} name="Sales (Lakh ₹)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>

        <AdminCard className="p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Category Mix</h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={VENDOR_CHART} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {VENDOR_CHART.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: G[100] }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {VENDOR_CHART.map((v, i) => (
              <div key={v.name} className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                {v.name} · {v.value}%
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AdminCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Inventory Status</h2>
            <Link to={ADMIN_ROUTES.products} className="text-xs font-bold hover:underline" style={{ color: PRIMARY }}>
              Manage products →
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_INVENTORY.map(item => {
              const low = item.stock <= item.lowStockThreshold;
              const out = !item.inStock || item.stock === 0;
              return (
                <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border" style={{ borderColor: G[100] }}>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900">{item.stock} units</p>
                    <StatusBadge
                      label={out ? "Out of stock" : low ? "Low stock" : "In stock"}
                      tone={out ? "red" : low ? "amber" : "green"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </AdminCard>

        <AdminCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <Link to={ADMIN_ROUTES.orders} className="text-xs font-bold hover:underline" style={{ color: PRIMARY }}>
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-gray-400 border-b" style={{ borderColor: G[100] }}>
                  <th className="pb-3 pr-4">Order ID</th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ORDERS.slice(0, 5).map(order => (
                  <tr key={order.id} className="border-b last:border-0" style={{ borderColor: G[50] }}>
                    <td className="py-3 pr-4 font-semibold text-gray-800">{order.id}</td>
                    <td className="py-3 pr-4 text-gray-600">{order.customer}</td>
                    <td className="py-3 pr-4 font-medium">₹{order.total.toLocaleString("en-IN")}</td>
                    <td className="py-3">
                      <StatusBadge
                        label={order.status}
                        tone={order.status === "Delivered" ? "green" : order.status === "Shipped" ? "blue" : "gray"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      </div>

      <AdminCard className="p-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Monthly Orders</h2>
          <Package size={18} style={{ color: PRIMARY }} />
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SALES_CHART}>
              <CartesianGrid strokeDasharray="3 3" stroke={G[100]} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: 12, borderColor: G[100] }} />
              <Bar dataKey="orders" fill={PRIMARY} radius={[6, 6, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </AdminCard>
    </div>
  );
}

export default AdminDashboard;
