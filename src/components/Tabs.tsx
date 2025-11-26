import TabComponent from "./TabComponent";

function Tabs() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reusable Tabs with Animation</h1>
      <TabComponent
        tabs={[
          {
            label: "Kaos",
            content: <p>✨ Selamat datang di halaman Home!</p>,
          },
          {
            label: "Tas",
            content: <p>👤 Ini adalah halaman Profile kamu.</p>,
          },
          {
            label: "Polo",
            content: <p>⚙️ Atur preferensi kamu di halaman Settings.</p>,
          },
          {
            label: "Semua",
            content: <p>Semua</p>,
          },
        ]}
      />
    </div>
  );
}

export default Tabs;
