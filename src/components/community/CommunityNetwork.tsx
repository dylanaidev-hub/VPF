const places = [
  { city: "Hà Nội", x: 50, y: 18 },
  { city: "Hải Phòng", x: 78, y: 32 },
  { city: "Đà Nẵng", x: 22, y: 36 },
  { city: "Khánh Hòa", x: 80, y: 64 },
  { city: "TP. Hồ Chí Minh", x: 54, y: 80 },
  { city: "Cần Thơ", x: 24, y: 72 },
]

const links: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 5],
  [3, 4],
  [5, 4],
  [2, 4],
  [0, 4],
]

export function CommunityNetwork({ city, onCity }: { city: string; onCity: (city: string) => void }) {
  return (
    <section className="bg-navy py-14 text-white md:py-16" aria-labelledby="mang-luoi-cong-dong">
      <div className="page-wrap">
        <div className="community-network-grid">
          <div className="min-w-0">
            <h2 id="mang-luoi-cong-dong" className="text-3xl font-semibold tracking-tight md:text-4xl">
              Mỗi sân đấu, một kết nối mới.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
              Khám phá mạng lưới cộng đồng Pickleball đang phát triển tại nhiều địa phương.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
              Sơ đồ kết nối minh họa, không phải bản đồ hành chính. Chọn một địa phương để lọc danh sách câu lạc bộ.
            </p>
          </div>

          <div className="community-network-board">
            <svg className="community-network-lines" viewBox="0 0 100 100" aria-hidden>
              {links.map(([from, to]) => (
                <line
                  key={`${from}-${to}`}
                  x1={places[from].x}
                  y1={places[from].y}
                  x2={places[to].x}
                  y2={places[to].y}
                />
              ))}
            </svg>
            {places.map((place) => {
              const selected = city === place.city
              return (
                <button
                  key={place.city}
                  type="button"
                  className="community-node"
                  style={{ left: `${place.x}%`, top: `${place.y}%` }}
                  aria-pressed={selected}
                  onClick={() => {
                    onCity(selected ? "Tất cả" : place.city)
                    document.getElementById("tim-cau-lac-bo")?.scrollIntoView()
                  }}
                >
                  <span className="community-node-dot" aria-hidden />
                  <span className="community-node-name">{place.city}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
