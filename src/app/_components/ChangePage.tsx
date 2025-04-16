type ChangePageProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export function ChangePage({ page, setPage }: ChangePageProps) {
  function handleNext() {
    setPage((curr) => curr + 1);
  }
  function handlePrev() {
    setPage((curr) => curr - 1);
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        padding: "10px",
      }}
    >
      <button
        onClick={handlePrev}
        disabled={page === 1}
        style={{
          padding: "8px 16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          opacity: page === 1 ? 0.6 : 1,
        }}
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        style={{
          padding: "8px 16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
}
