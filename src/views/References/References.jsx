import { useState, useEffect } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from 'react-bootstrap/Spinner';
import Inbox from "./Inbox/Inbox";
import axiosClient from "../../axios";
import Swal from 'sweetalert2';
function Referencess() {
  const [tab, setTab] = useState("recive");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState({});
  // const user = useSelector((state) => state.user);
  const [user, setUser] = useState({
    id: localStorage.getItem('user_id'),
    role_id: localStorage.getItem('role_id'),
    first_name: localStorage.getItem('first_name'),
    last_name: localStorage.getItem('last_name'),
  });
  const fetchData = async  () => {
    let parameters = {};
    let temp_url = '';
    if (tab == 'recive') 
      temp_url = '/reference/referralsReceived/';
    else 
      temp_url = '/reference/references/';

    parameters = {
      url: temp_url,
      data: {
          page: page,
          ...filterData,
      },
    };
    // console.log(parameters.url);
    // console.log(parameters.data);
    axiosClient.post(parameters.url, parameters.data).then(res => {
        // console.log("data :: ",res.data);
        setData(res.data.data);
        setMaxPage(res.data.last_page)
        setLoading(false)
    })
    .catch((error) => {
        console.log(error);

        setLoading(false)
        });
  }
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [tab, page, user, filterData]);
  // useEffect(() => {
  //   console.log(data);
  //   }, [data]);
  const handleTab = (key) => {
    if(key != tab){
      setLoading(true);
      setPage(1);
      setTab(key);
      setFilterData({});
    }
  }
  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: 'درحال پردازش ... ',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [loading]);

  const inboxProps = {
    user,
    tab,
    data,
    page,
    setPage,
    maxPage,
    fetchData,
    loading,
    setLoading,
    filterData,
    setFilterData
  };

    return (
          <div className="row justify-content-center mt-5">
            <div className="col-md-12">
              <div className="card">
                  <Tabs
                    defaultActiveKey="recive"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                    onSelect={handleTab}
                  >
                    <Tab eventKey="recive" title="ارجاع های دریافتی">
                        <Inbox {...inboxProps}/>
                    </Tab>
                    <Tab eventKey="send" title="ارجاع های ارسالی">
                        <Inbox {...inboxProps}/>
                    </Tab>

                  </Tabs>
                </div>
              </div>
            </div>

      );
}

export default Referencess;
