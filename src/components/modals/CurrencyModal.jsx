import React, { PureComponent, Fragment } from "react";
import { CURRENCIES } from "../../query/queries";
import { connect } from "react-redux";
import { Query } from "@apollo/client/react/components";
import { ReactComponent as Downward } from "../../icons/downward.svg";
import { ReactComponent as Upwards } from "../../icons/upwards.svg";
import { showModal } from "../../redux/modal-reducer";
import { setCurrency } from "../../redux/currency-reducer";

class CurrencyModal extends PureComponent {
  handleOutsideClick = (e) => {
    if (!this.node.contains(e.target)) {
      this.handleClick();
    }
  };

  handleClick = () => {
    if (!this.props.show) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.props.showModal();
  };

  render() {
    return (
      <Fragment>
        <div
          ref={(node) => {
            this.node = node;
          }}
        >
          <button
            className="currency-list"
            onClick={() => {
              const currentPage = window.location.pathname.split("/")[1];
              if (currentPage !== "cart-page") {
                this.handleClick();
              }
            }}
          >
            <span className="currency">{this.props.currency}</span>
            <span className="arrow">
              {!this.props.show ? <Downward /> : <Upwards />}
            </span>
          </button>
        </div>
        {!this.props.show ? null : (
          <div className="modal">
            <Query query={CURRENCIES}>
              {({ loading, error, data }) => {
                if (loading) return <div>loading...</div>;
                if (error) return <div>Error fetching Currency.</div>;
                else {
                  const currency = data.currencies.map((currency) => currency);
                  return (
                    <>
                      {currency.map((coin) => {
                        return (
                          <div
                            key={coin.symbol}
                            className="currencies"
                            onClick={() => this.props.setCurrency(coin.symbol)}
                          >
                            <span>{coin.symbol}</span> <span>{coin.label}</span>
                          </div>
                        );
                      })}
                    </>
                  );
                }
              }}
            </Query>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  show: state.modal.show,
  currency: state.currency.defaultCurrency,
});

const mapDispatchToProps = { showModal, setCurrency };
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyModal);
