import React,{useState,useEffect} from 'react'
import { ListView,PullToRefresh } from 'antd-mobile'
import {cloneDeep} from 'lodash'
import axios from 'axios'
import './index.css'

// import {data} from './store'

const data = [
    {
      img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      title: 'Meet hotel',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: 'McDonald\'s invites you',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
      title: 'Eat the week',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
  ];
const NUM_ROWS = 10
let pageIndex = 0

function genData(pIndex){
    const dataBlob = {};
    axios.post('http://yapi.demo.qunar.com/mock/18302/atsng/delivery/listDelivery')
    .then(res=>{
        console.log(res)
    })
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}
function Demo(props){
    const [list,setList] = useState([])
    const [rData,setRData] = useState([])
    const [total,setTotal] = useState(0)
    const [refreshing,setRefreshing] = useState(false)
    const dataSources = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
      const [dataSource,setDataSource] = useState(dataSources)
      const [isLoading,setIsLoading] = useState(true)
      useEffect(()=>{
        setTimeout(() => {
            let o = genData(pageIndex)
            setRData(o)
            setDataSource(dataSource.cloneWithRows(o))
            setIsLoading(false)
          }, 600);
          axios.post('http://yapi.demo.qunar.com/mock/18302/atsng/delivery/listDelivery')
          .then(res=>{
            //   console.log(res,'666666')
              const {data,pagination} = res.data.results
              setList(data)
              setTotal(pagination.total)
          })
      },[])
      const onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (isLoading) {
            /**
             * 我需要在这控制没有更多加载
             * 
             */
          return;
        }
        if(dataSource._cachedRowCount>=total)return
        // console.log('reach end', event);
        setIsLoading(true)
        setTimeout(() => {
         let o = { ...rData, ...genData(++pageIndex) };
         setRData(o)
         let o1 = cloneDeep(dataSource).cloneWithRows(o)
          setDataSource(o1)
          setIsLoading(false)
        }, 1000);
      }
      const separator = (sectionID, rowID) => (
        <div
          key={`${sectionID}-${rowID}`}
          style={{
            backgroundColor: '#F5F5F9',
            height: 8,
            borderTop: '1px solid #ECECED',
            borderBottom: '1px solid #ECECED',
          }}
        />
      );

      const onRefresh = () => {
        setRefreshing(true)
        setIsLoading(true)
        // simulate initial Ajax
        setTimeout(() => {
          let rData = genData(0)
          setDataSource(dataSource.cloneWithRows(rData))
          setRefreshing(false)
          setIsLoading(false)
        }, 600);
      };

      let index = list.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = list.length - 1;
      }
      const obj = list[index--];
      return (
        <div key={rowID} style={{ padding: '0 15px' }} className='ul'>
            <div className='li'>
                <div className='li-left'>
                    <p className='img'>{rowID}</p>
                </div>
                <div className='li-right'>
                    <p>{obj.resume_data.name}</p>
                    <p>{obj.resume_data.gender==='F'?'女':'男'}</p>
                    <p>应聘岗位:{obj.position_data[0].category_name}</p>
                </div>
            </div>
        </div>
      );
    };
    return (
        <ListView
        // ref={el => this.lv = el}
        dataSource={dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={onEndReached}
        onEndReachedThreshold={10}
        pullToRefresh={<PullToRefresh
            refreshing={refreshing}
            onRefresh={onRefresh}
            />}
        >
        </ListView>
    )
}

export default Demo
