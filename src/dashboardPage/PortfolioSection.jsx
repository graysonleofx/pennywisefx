import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowTrendDown,
  faArrowTrendUp,
  faChartLine,
  faCircleDollarToSlot,
  faCoins,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const MARKET_API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1";

const assetDefinitions = [
  { name: "Bitcoin", symbol: "BTC", match: "bitcoin", color: "#f7931a" },
  { name: "Ethereum", symbol: "ETH", match: "eth", color: "#8c9eff" },
  { name: "USDT", symbol: "USDT", match: "usdt", color: "#26a17b" },
];

function formatCurrency(amount) {
  return Number(amount || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(dateValue) {
  if (!dateValue) return "Recently";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Recently";
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

function getAssetAllocation(transactions) {
  const totals = assetDefinitions.map((asset) => ({ ...asset, amount: 0 }));

  transactions.forEach((transaction) => {
    const type = String(transaction?.transaction || "").toLowerCase();
    const paymentMethod = String(transaction?.paymentMethod || "").toLowerCase();
    const amount = Number(transaction?.amount || 0);
    const asset = totals.find(({ match }) => paymentMethod.includes(match));

    if (asset && type.includes("deposit") && amount > 0) {
      asset.amount += amount;
    }
  });

  const totalDeposited = totals.reduce((sum, asset) => sum + asset.amount, 0);
  return totals
    .filter((asset) => asset.amount > 0)
    .map(({ match, ...asset }) => ({
      ...asset,
      percentage: totalDeposited ? (asset.amount / totalDeposited) * 100 : 0,
    }));
}

function activityDetails(transaction) {
  const type = String(transaction.transaction || "").toLowerCase();
  if (type.includes("withdraw")) return { label: "Withdrawal", icon: faArrowDown, tone: "withdrawal" };
  if (type.includes("invest")) return { label: "Investment", icon: faChartLine, tone: "investment" };
  return { label: "Deposit", icon: faCoins, tone: "deposit" };
}

function AssetRow({ asset, totalValue }) {
  const value = totalValue * (asset.percentage / 100);
  return (
    <div className="portfolio-asset-row">
      <div className="portfolio-asset-icon" style={{ "--asset-color": asset.color }}>{asset.symbol.slice(0, 1)}</div>
      <div className="portfolio-asset-name"><strong>{asset.name}</strong><span>{asset.symbol}</span></div>
      <div className="portfolio-asset-value"><strong>{formatCurrency(value)}</strong><span>{asset.percentage.toFixed(1)}%</span></div>
      <div className="portfolio-progress" aria-hidden="true"><span style={{ width: `${asset.percentage}%`, backgroundColor: asset.color }} /></div>
    </div>
  );
}

function ActivityItem({ transaction }) {
  const details = activityDetails(transaction);
  const isWithdrawal = details.tone === "withdrawal";
  return (
    <div className="portfolio-activity-item">
      <div className={`portfolio-activity-icon ${details.tone}`}><FontAwesomeIcon icon={details.icon} /></div>
      <div className="portfolio-activity-copy"><strong>{details.label}</strong><span>{formatDate(transaction.date)}</span></div>
      <strong className={`portfolio-activity-amount ${isWithdrawal ? "negative" : "positive"}`}>
        {isWithdrawal ? "-" : "+"}{formatCurrency(transaction.amount)}
      </strong>
    </div>
  );
}

function PortfolioOverview({ totalValue, available, invested, profit, roi, onInvest, onWithdraw }) {
  return (
    <section className="portfolio-overview portfolio-panel">
      <div className="portfolio-section-heading">
        <div><span className="portfolio-eyebrow">YOUR FINANCIAL POSITION</span><h2>Portfolio Overview</h2></div>
        <span className="portfolio-status"><span /> Live balance</span>
      </div>
      <div className="portfolio-value-block">
        <span className="portfolio-label">Total Portfolio Value</span>
        <strong className="portfolio-total-value">{formatCurrency(totalValue)}</strong>
        <span className="portfolio-performance"><FontAwesomeIcon icon={faArrowTrendUp} /> +{formatCurrency(profit)} <b>+{roi.toFixed(2)}%</b></span>
      </div>
      <div className="portfolio-stats">
        <div><span>Available</span><strong>{formatCurrency(available)}</strong></div>
        <div><span>Invested</span><strong>{formatCurrency(invested)}</strong></div>
        <div><span>Total Profit</span><strong className="positive">+{formatCurrency(profit)}</strong></div>
        <div><span>ROI</span><strong className="positive">+{roi.toFixed(2)}%</strong></div>
      </div>
      <div className="portfolio-actions">
        <Link to="/dashboard/deposits" className="portfolio-button primary"><FontAwesomeIcon icon={faCircleDollarToSlot} /> Deposit</Link>
        <button type="button" className="portfolio-button secondary" onClick={onInvest}><FontAwesomeIcon icon={faChartLine} /> Invest</button>
        <button type="button" className="portfolio-button secondary" onClick={onWithdraw}><FontAwesomeIcon icon={faWallet} /> Withdraw</button>
      </div>
    </section>
  );
}

export default function PortfolioSection({ totalProfit, totalDeposit, totalInvestment, transactions = [], onInvest, onWithdraw }) {
  const [marketMovers, setMarketMovers] = useState([]);
  const [marketLoading, setMarketLoading] = useState(true);
  const [marketError, setMarketError] = useState("");

  const metrics = useMemo(() => {
    const profit = Number(totalProfit || 0);
    const invested = Number(totalInvestment || 0);
    const deposit = Number(totalDeposit || 0);
    const available = deposit + profit;
    const totalValue = available + invested;
    const roi = deposit + invested > 0 ? (profit / (deposit + invested)) * 100 : 0;
    return { profit, invested, available, totalValue, roi };
  }, [totalDeposit, totalInvestment, totalProfit]);

  const assetAllocation = useMemo(() => getAssetAllocation(transactions), [transactions]);

  useEffect(() => {
    let active = true;
    const loadMarketMovers = async () => {
      try {
        const response = await fetch(MARKET_API);
        if (!response.ok) {
          throw new Error(`CoinGecko returned HTTP ${response.status}`);
        }
        const result = await response.json();
        if (active) {
          setMarketMovers(result);
          setMarketError("");
          setMarketLoading(false);
        }
      } catch (error) {
        if (active) {
          setMarketError(error instanceof TypeError ? "Network or browser access blocked the request." : error.message);
          setMarketLoading(false);
        }
      }
    };
    loadMarketMovers();
    const interval = setInterval(loadMarketMovers, 30000);
    return () => { active = false; clearInterval(interval); };
  }, []);

  const recentTransactions = useMemo(() => transactions.filter((transaction) => transaction && transaction.amount).slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4), [transactions]);

  return (
    <div className="portfolio-section">
      <PortfolioOverview {...metrics} onInvest={onInvest} onWithdraw={onWithdraw} />
      <div className="portfolio-columns">
        <section className="portfolio-panel portfolio-list-panel">
          <div className="portfolio-section-heading compact"><div><span className="portfolio-eyebrow">ALLOCATION</span><h2>Your Assets</h2></div><span className="portfolio-link">View all <span aria-hidden="true">→</span></span></div>
          <div className="portfolio-asset-list">{assetAllocation.length ? assetAllocation.map((asset) => <AssetRow key={asset.symbol} asset={asset} totalValue={metrics.totalValue} />) : <p className="portfolio-empty-state">Asset allocation will appear after your first crypto deposit.</p>}</div>
        </section>
        <section className="portfolio-panel portfolio-list-panel">
          <div className="portfolio-section-heading compact"><div><span className="portfolio-eyebrow">ACCOUNT TIMELINE</span><h2>Recent Activity</h2></div><Link to="/dashboard/transations" className="portfolio-link">View history <span aria-hidden="true">→</span></Link></div>
          <div className="portfolio-activity-list">{recentTransactions.length ? recentTransactions.map((transaction) => <ActivityItem key={transaction.id || `${transaction.date}-${transaction.amount}`} transaction={transaction} />) : <p className="portfolio-empty-state">Your latest transactions will appear here.</p>}</div>
        </section>
      </div>
      <section className="portfolio-panel market-movers-panel">
        <div className="portfolio-section-heading compact"><div><span className="portfolio-eyebrow">LIVE MARKET</span><h2>Market Movers</h2></div><span className="portfolio-link">View market <span aria-hidden="true">→</span></span></div>
        {marketLoading ? <p className="portfolio-empty-state">Loading live market data...</p> : marketMovers.length ? <div className="market-movers-grid">{marketMovers.map((coin) => <div className="market-mover" key={coin.id}><div className="market-mover-coin"><img src={coin.image} alt="" /><strong>{coin.symbol.toUpperCase()}</strong></div><strong>{formatCurrency(coin.current_price)}</strong><span className={coin.price_change_percentage_24h >= 0 ? "positive" : "negative"}>{coin.price_change_percentage_24h >= 0 ? "+" : ""}{Number(coin.price_change_percentage_24h || 0).toFixed(2)}% <FontAwesomeIcon icon={coin.price_change_percentage_24h >= 0 ? faArrowTrendUp : faArrowTrendDown} /></span></div>)}</div> : <p className="portfolio-empty-state">{marketError || "Market data is temporarily unavailable."}</p>}
      </section>
    </div>
  );
}
