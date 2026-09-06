import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowTrendUp,
  faArrowUp,
  faCheck,
  faChevronRight,
  faCircleInfo,
  faClock,
  faCopy,
  faDatabase,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import DashBars from "./dash-bar";
import "../styles/dashboard.css";

const filters = ["all", "deposits", "withdrawals", "pending", "approved"];

function normalizeStatus(status) {
  const value = String(status || "pending").toLowerCase();
  if (["success", "successful", "complete", "completed", "approved"].includes(value)) return "approved";
  if (["failed", "rejected", "declined"].includes(value)) return "rejected";
  if (value === "processing") return "processing";
  return "pending";
}

function normalizeType(transaction) {
  const value = String(transaction.transaction || transaction.type || "deposit").toLowerCase();
  return value.includes("withdraw") ? "withdrawal" : value.includes("invest") ? "investment" : "deposit";
}

function paymentLabel(transaction) {
  return transaction.paymentMethod || transaction.payment || "Account balance";
}

function formatCurrency(amount) {
  return Number(amount || 0).toLocaleString("en-US", {
    style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2,
  });
}

function formatDate(dateValue, withTime = false) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return date.toLocaleString("en-US", withTime ? {
    month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  } : { month: "short", day: "2-digit", year: "numeric" });
}

function statusDetails(status) {
  const details = {
    pending: { label: "Pending", icon: faClock },
    approved: { label: "Approved", icon: faCheck },
    rejected: { label: "Rejected", icon: faXmark },
    processing: { label: "Processing", icon: faClock },
  };
  return details[status] || details.pending;
}

function transactionIcon(transaction) {
  const method = paymentLabel(transaction).toLowerCase();
  return method.includes("bitcoin") || method.includes("btc") ? faArrowUp : faDatabase;
}

function StatusBadge({ status }) {
  const details = statusDetails(status);
  return <span className={`transaction-status ${status}`}><FontAwesomeIcon icon={details.icon} /> {details.label}</span>;
}

function TransactionDetails({ transaction, onClose }) {
  const [copied, setCopied] = useState("");
  const status = normalizeStatus(transaction.status);
  const type = normalizeType(transaction);
  const reference = transaction.referenceId || transaction.hash || transaction.transactionHash;
  const copyValue = async (label, value) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("");
    }
  };

  return (
    <div className="transaction-modal-backdrop" role="presentation" onClick={onClose}>
      <section className="transaction-modal" role="dialog" aria-modal="true" aria-labelledby="transaction-details-title" onClick={(event) => event.stopPropagation()}>
        <div className="transaction-modal-header"><div><span className="transaction-kicker">TRANSACTION DETAILS</span><h2 id="transaction-details-title">{paymentLabel(transaction)}</h2></div><button type="button" className="transaction-close" aria-label="Close details" onClick={onClose}><FontAwesomeIcon icon={faXmark} /></button></div>
        <div className="transaction-detail-status"><StatusBadge status={status} /><span>{formatDate(transaction.date, true)}</span></div>
        <div className="transaction-detail-grid">
          <div><span>Transaction ID</span><strong>{transaction.id || "Unavailable"}</strong></div>
          <div><span>Amount</span><strong>{formatCurrency(transaction.amount)}</strong></div>
          <div><span>Payment Method</span><strong>{paymentLabel(transaction)}</strong></div>
          <div><span>Transaction Type</span><strong>{type[0].toUpperCase() + type.slice(1)}</strong></div>
          {transaction.walletAddress && <div className="transaction-detail-wide"><span>Wallet Address</span><strong>{transaction.walletAddress}</strong><button type="button" onClick={() => copyValue("wallet", transaction.walletAddress)}><FontAwesomeIcon icon={faCopy} /> {copied === "wallet" ? "Copied" : "Copy"}</button></div>}
          {reference && <div className="transaction-detail-wide"><span>Reference ID</span><strong>{reference}</strong><button type="button" onClick={() => copyValue("reference", reference)}><FontAwesomeIcon icon={faCopy} /> {copied === "reference" ? "Copied" : "Copy"}</button></div>}
          {transaction.rejectionReason && <div className="transaction-detail-wide"><span>Rejection reason</span><strong>{transaction.rejectionReason}</strong></div>}
        </div>
      </section>
    </div>
  );
}

function TransactionRow({ transaction, onSelect }) {
  const status = normalizeStatus(transaction.status);
  const type = normalizeType(transaction);
  const isWithdrawal = type === "withdrawal";
  return (
    <>
      <div className="transaction-table-row">
        <div className="transaction-id-cell"><span className="transaction-method-icon"><FontAwesomeIcon icon={transactionIcon(transaction)} /></span><span title={transaction.id}>{transaction.id || "N/A"}</span></div>
        <strong className={isWithdrawal ? "transaction-amount negative" : "transaction-amount"}>{isWithdrawal ? "-" : "+"}{formatCurrency(transaction.amount)}</strong>
        <span>{paymentLabel(transaction)}</span>
        <span className={`transaction-type ${type}`}>{type}</span>
        <StatusBadge status={status} />
        <span>{formatDate(transaction.date)}</span>
        <button type="button" className="transaction-view-button" onClick={() => onSelect(transaction)} aria-label="View transaction details"><FontAwesomeIcon icon={faChevronRight} /></button>
      </div>
      <div className="transaction-mobile-card" role="button" tabIndex="0" onClick={() => onSelect(transaction)} onKeyDown={(event) => event.key === "Enter" && onSelect(transaction)}>
        <div className="transaction-mobile-top"><div className="transaction-mobile-method"><span className="transaction-method-icon"><FontAwesomeIcon icon={transactionIcon(transaction)} /></span><div><strong>{paymentLabel(transaction)}</strong><span className={`transaction-type ${type}`}>{type}</span></div></div><StatusBadge status={status} /></div>
        <strong className={`transaction-mobile-amount ${isWithdrawal ? "negative" : ""}`}>{isWithdrawal ? "-" : "+"}{formatCurrency(transaction.amount)}</strong>
        <div className="transaction-mobile-bottom"><span>{formatDate(transaction.date)}</span><span className="transaction-mobile-link">View details <FontAwesomeIcon icon={faChevronRight} /></span></div>
      </div>
    </>
  );
}

function SummaryCard({ label, value, icon, tone }) {
  return <div className="transaction-summary-card"><span className={`transaction-summary-icon ${tone}`}><FontAwesomeIcon icon={icon} /></span><div><span>{label}</span><strong>{value}</strong></div></div>;
}

function TransactionPage({ username, email, transactions = [] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const normalizedTransactions = useMemo(() => transactions.slice().sort((a, b) => new Date(b.date) - new Date(a.date)), [transactions]);
  const summary = useMemo(() => {
    const approved = normalizedTransactions.filter((transaction) => normalizeStatus(transaction.status) === "approved");
    const pending = normalizedTransactions.filter((transaction) => normalizeStatus(transaction.status) === "pending");
    const volume = normalizedTransactions.reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);
    return { approved: approved.length, pending: pending.length, volume };
  }, [normalizedTransactions]);
  const visibleTransactions = normalizedTransactions.filter((transaction) => {
    const status = normalizeStatus(transaction.status);
    const type = normalizeType(transaction);
    return activeFilter === "all" || activeFilter === status || activeFilter === type || (activeFilter === "deposits" && type === "deposit") || (activeFilter === "withdrawals" && type === "withdrawal");
  });

  return (
    <div className="navigate-bars">
      <DashBars username={username} email={email} />
      <div className="main">
        <div className="dashbord-ccontainer transaction-page-container">
          {/* <header className="transaction-page-header"><div><span className="transaction-kicker">ACCOUNT ACTIVITY</span><h1>Transaction History</h1><p>Track and manage all your account transactions</p></div><span className="transaction-header-count"><FontAwesomeIcon icon={faCircleInfo} /> {normalizedTransactions.length} records</span></header> */}
          {/* <section className="transaction-summary-grid">
            <SummaryCard label="Total Transactions" value={normalizedTransactions.length} icon={faDatabase} tone="neutral" />
            <SummaryCard label="Pending Transactions" value={summary.pending} icon={faClock} tone="pending" />
            <SummaryCard label="Approved Transactions" value={summary.approved} icon={faCheck} tone="approved" />
            <SummaryCard label="Total Volume" value={formatCurrency(summary.volume)} icon={faArrowTrendUp} tone="volume" />
          </section> */}
          <section className="transaction-history-panel">
            <div className="transaction-toolbar"><div><h2>All activity</h2><p>{visibleTransactions.length} matching transaction{visibleTransactions.length === 1 ? "" : "s"}</p></div><div className="transaction-filter-list" role="tablist" aria-label="Transaction filters">{filters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={activeFilter === filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>{filter[0].toUpperCase() + filter.slice(1)}</button>)}</div></div>
            {visibleTransactions.length ? <><div className="transaction-table" role="table"><div className="transaction-table-header" role="row"><span>Transaction ID</span><span>Amount</span><span>Payment Method</span><span>Type</span><span>Status</span><span>Date</span><span>Details</span></div><div className="transaction-table-body">{visibleTransactions.map((transaction, index) => <TransactionRow key={transaction.id || `${transaction.date}-${transaction.amount}-${index}`} transaction={transaction} onSelect={setSelectedTransaction} />)}</div></div><div className="transaction-mobile-list">{visibleTransactions.map((transaction, index) => <TransactionRow key={transaction.id || `${transaction.date}-${transaction.amount}-${index}`} transaction={transaction} onSelect={setSelectedTransaction} />)}</div></> : <div className="transaction-empty"><FontAwesomeIcon icon={faDatabase} /><strong>No transactions found</strong><span>Completed and pending activity will appear here.</span></div>}
          </section>
          <div className="dashboard-copyright-div"><p>All Rights Reserved © Pennywise FX {new Date().getFullYear()}</p></div>
        </div>
      </div>
      {selectedTransaction && <TransactionDetails transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />}
    </div>
  );
}

export default TransactionPage;
