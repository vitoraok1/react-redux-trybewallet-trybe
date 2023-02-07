import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './css/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <section className="wallet-page">
        <div className="wallet-page-header">
          <Header />
          <WalletForm />
          <Table />
        </div>
      </section>
    );
  }
}

export default Wallet;
