export default function TitleBar() {
  const handleMinimize = () => {
    console.log(
      "--- Checkpoint A: Minimize button clicked in renderer process."
    );
    window.electronAPI.minimizeWindow();
  };

  const handleClose = () => {
    console.log("--- Checkpoint A: Close button clicked in renderer process.");
    window.electronAPI.closeWindow();
  };

  return (
    <div
      style={{
        width: "100vw", // force full screen width
        height: 65,
        backgroundColor: "#242424",
        color: "white",
        display: "flex",
        alignItems: "center",
        userSelect: "none",
        // @ts-ignore
        ["-webkit-app-region"]: "drag",
      }}
    >
      {/* LEFT: Questly title - hugging left edge */}
      <div>Questly</div>

      <div style={{ width: 245 }} />

      {/* RIGHT: Buttons */}
      <div
        style={{
          display: "flex",
          gap: 10,
          paddingRight: 10,
          // @ts-ignore
          ["-webkit-app-region"]: "no-drag",
        }}
      >
        <img
          src="/TitleBarMinimize.png"
          alt="Minimize"
          style={{ width: 16, height: 16, cursor: "pointer" }}
          onClick={handleMinimize}
        />
        <img
          src="/TitleBarCross.png"
          alt="Close"
          style={{ width: 16, height: 16, cursor: "pointer" }}
          onClick={handleClose}
        />
      </div>
    </div>
  );
}
