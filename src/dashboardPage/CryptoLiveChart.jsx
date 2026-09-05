import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
} from "recharts";

const API_URL = "https://api.coingecko.com/api/v3";

const ranges = [
  { label: "24H", days: "1" },
  { label: "7D", days: "7" },
  { label: "1M", days: "30" },
  { label: "3M", days: "90" },
  { label: "YTD", days: "365" },
  { label: "1Y", days: "365" },
  { label: "Max", days: "max" },
];

function formatPrice(value) {
  if (!value) return "$0.00";

  return `$${Number(value).toLocaleString(undefined, {
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  })}`;
}

function formatDate(timestamp, days) {
  const date = new Date(timestamp);

  if (days === "1") {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

function PriceTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="crypto-tooltip">
      <span>{label}</span>
      <strong>{formatPrice(payload[0].value)}</strong>
    </div>
  );
}

export default function CryptoLiveChart() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [price, setPrice] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load the top 100 cryptocurrencies
  useEffect(() => {
    const loadCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`
        );

        if (!response.ok) throw new Error("Unable to load cryptocurrencies");

        const result = await response.json();
        setCoins(result);
      } catch (err) {
        setError(err.message);
      }
    };

    loadCoins();
  }, []);

  // Load selected cryptocurrency chart
  useEffect(() => {
    const loadChart = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/coins/${selectedCoin}/market_chart?vs_currency=usd&days=1&interval=hourly`
        );

        if (!response.ok) throw new Error("Unable to load crypto prices");

        const result = await response.json();

        const chartData = result.prices.map(([timestamp, value]) => ({
          time: new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: Number(value.toFixed(2)),
        }));

        setData(chartData);
        setPrice(chartData.at(-1)?.price || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadChart();

    const interval = setInterval(loadChart, 30000);

    return () => clearInterval(interval);
  }, [selectedCoin]);

  const selectedCoinDetails = coins.find(
    (coin) => coin.id === selectedCoin
  );

  return (
    <div className="crypto-chart-card">
      <div className="crypto-chart-header">
        <div>
          <p className="chart-label">CRYPTO MARKET</p>

          <h2>
            {selectedCoinDetails?.name || "Cryptocurrency"}
            {selectedCoinDetails?.symbol &&
              ` (${selectedCoinDetails.symbol.toUpperCase()})`}
          </h2>

          <strong>${price.toLocaleString()}</strong>
        </div>

        <select
          value={selectedCoin}
          onChange={(event) => setSelectedCoin(event.target.value)}
        >
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.market_cap_rank}. {coin.name} (
              {coin.symbol.toUpperCase()})
            </option>
          ))}
        </select>
      </div>

      {error && <p className="crypto-error">{error}</p>}

      {loading ? (
        <p>Loading live price...</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={data}>
            <defs>
              <linearGradient
                id="cryptoGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="yellowgreen" stopOpacity={0.4} />
                <stop offset="95%" stopColor="yellowgreen" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip
              formatter={(value) => `$${Number(value).toLocaleString()}`}
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke="yellowgreen"
              strokeWidth={2}
              fill="url(#cryptoGradient)"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}

      <small className="crypto-live-status">
        ● Top 100 crypto market prices · Updates every 30 seconds
      </small>
    </div>
  );
}