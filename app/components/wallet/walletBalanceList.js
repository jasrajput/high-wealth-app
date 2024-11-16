import React from 'react';
import WalletBalance from './walletBalance';
import DepositCryptoModal from '../../components/modal/depositCryptoModal';
import WithdrawCryptoModal from '../../components/modal/withdrawCryptoModal';
import RBSheet from "react-native-raw-bottom-sheet";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

class WalletBalanceList extends React.Component {
  
    state = {
      data: this.props.data,
      swiping: false,
      rbSheet:'',
    }
  
    cleanFromScreen(id) {
        const data = this.state.data.filter(item => {
          return item.id !== id;
        });
        this.setState({ data });
    }
    
    
    renderItems() {
      
      return this.state.data.map((item) => {
        
        return (
          <WalletBalance
              theme={this.props.theme}
              key={item.id}
              swipingCheck={(swiping) => this.setState({ swiping })}
              coin={item.coin}
              coinName={item.coinName}
              amount={item.amount}
              trade={item.trade}
              data={item.data}
              btc={item.btc}
              tag={item.tag}
              id={item.id}
              cleanFromScreen={(id) => this.cleanFromScreen(id)}
              leftButtonPressed={() => console.log('Delete')}
              withdrawButtonPressed={() => {this.setState({ rbSheet:'withdraw'}),this.RBSheet.open()}}
              tradeButtonPressed={() => this.props.navigate(this.props.destination)}
              depositButtonPressed={() => {this.setState({ rbSheet:'deposit'}),this.RBSheet.open()}}
          />
        );
      });


    }
  render() {
    
    return (
        <>
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            closeOnDragDown={true}
            height={this.state.rbSheet === "deposit" ? 260 : this.state.rbSheet === "withdraw" ?  500 : 430}
            openDuration={300}
            customStyles={{
              wrapper: {
                  //backgroundColor: this.props.colors.modalBackLayer,
              },
              container:{
                  backgroundColor: this.props.theme.colors.background,
                  borderTopLeftRadius:15,
                  borderTopRightRadius:15,
              },
              draggableIcon: {
                  width:90,
                  backgroundColor: this.props.theme.colors.borderColor,
              }
          }}
          >
            {this.props.theme.dark &&
              <LinearGradient
                colors={["rgba(22,23,36,.7)","rgba(22,23,36,0)"]}
                style={{
                  position:'absolute',
                  height:'100%',
                  width:'100%',
                }}
              >
              </LinearGradient>
            }
            { this.state.rbSheet === "deposit" ?
              <DepositCryptoModal/>
              :
              this.state.rbSheet === "withdraw" ?
              <WithdrawCryptoModal/>
              :
              <DepositCryptoModal/>
            }
          </RBSheet>
          <GestureHandlerRootView>
            {this.renderItems()}
          </GestureHandlerRootView>
        </>
    );
  }

}

export default WalletBalanceList;