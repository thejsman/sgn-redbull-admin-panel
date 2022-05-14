import React, { useReducer, useEffect, useState } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getUserById, getUserFollowingService, getUserTopicsFollowingService, updateStatus, deleteUserService } from '../../services/ApiServices';
import { checkUrlType, resHandle } from '../../components/util/utils';
import moment from 'moment';
import siteSetting from '../../config/env/Index';
import Pagination from 'react-js-pagination';
import { Tabs, Tab, Modal } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ToastContainer, toast } from 'react-toastify';

const validurl = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i



const AskerView = () => {
    const history = useHistory();
    const { id } = useParams();
    const breadcrumb = [
        { link: '/asker-management', linkText: 'Asker Management' },
        { link: '', linkText: 'Asker view' }
    ];
    const limit = 20;
    const [followers, setFollowers] = useState([]);
    const [followersCount, setFollowersCount] = useState(0);
    const [followerSearch, setFollowersSearch] = useState('');
    const [followerPage, setFollowersPage] = useState(1);

    const [topicsfollow, setTopicsfollow] = useState([]);
    const [topicsfollowCount, setTopicsfollowCount] = useState(0);
    const [topicsfollowSearch, setTopicsfollowSearch] = useState('');
    const [topicsfollowPage, setTopicsfollowPage] = useState(1);
    const [confirmModal, setConfirmModal] = useState(false);
    const [statusModal, setStatusModal] = useState(false);
    const [confirmUser, setConfirmUser] = useState('');
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [userStatus, setUserStatus] = useState('');


    const [state, setstate] = useReducer((state, newstate) => ({ ...state, ...newstate }), {
        _askerId: id,
        userDetailsArr: [],
        name: '',
        lastName: '',
        mobile: '',
        countryCode: '',
        email: '',
        country: '',
        DOB: '',
        topic: '',
        totalAsk: '',
        solver: '',
        totalActiveAsk: '',
        totalInvalidAsk: '',
        askSolvedCount: '',
        profileImage: '',

        twitter: '',
        Website: '',
        tiktok: '',
        facebook: '',
        instagram: '',
        linkedIn: '',
        youtube: '',
        joiningdate: '',
        totalOutExpertiseAsk: '',

    })

    useEffect(() => {
        handleGetUserById()
    }, [])


    const getUserFollowing = () => {
        let query = `?userID=${id}&limit=${limit}&page=${followerPage}`;
        getUserFollowingService(query).then(res => {
            let { status, data } = resHandle(res);
            if (status) {
                setFollowers(data.result);
                setFollowersCount(data.count);
            }
        })
    }


    const getUserTopicsFollowing = () => {
        let query = `?userID=${id}&limit=${limit}&page=${topicsfollowPage}`;
        getUserTopicsFollowingService(query).then(res => {
            let { status, data } = resHandle(res);
            if (status) {
                setTopicsfollow(data.result);
                setTopicsfollowCount(data.count);

            }
        })
    }

    useEffect(() => {
        getUserFollowing();
    }, [followerPage])

    useEffect(() => {
        getUserTopicsFollowing();
    }, [topicsfollowPage])


    const handleGetUserById = () => {
        let { _askerId } = state
        let params = {
            userId: _askerId
        }
        getUserById(params).then(res => {
            let { status, data } = resHandle(res);
            let result = data?.result;
            if (status) {
                setUserStatus(result.status);
                setstate({
                    loader: false,
                    userDetailsArr: result,
                    name: result.name,
                    lastName: result.lastName,
                    mobile: result.mobile,
                    countryCode: result.countryCode,
                    email: result.email,
                    country: result.country,
                    DOB: result.dob,
                    topic: result.topic,
                    totalAsk: result.totalAsk,
                    totalOutExpertiseAsk: result.totalOutExpertiseAsk,
                    solver: result.solver,
                    askSolvedCount: result.askSolvedCount,
                    totalActiveAsk: result.totalActiveAsk,
                    totalInvalidAsk: result.totalInvalidAsk,
                    profileImage: result.profileImage,
                    twitter: result.twitterUrl,
                    Website: result.websiteUrl,
                    tiktok: result.tiktokUrl,
                    facebook: result.fbUrl,
                    instagram: result.instaUrl,
                    linkedIn: result.linkedInUrl,
                    youtube: result.youtubeUrl,
                    joiningdate: result.created,
                    cm_status: result.status,
                })
            }
        })
    }



    const handleClose = () => {
        setConfirmModal(false);
        setStatusModal(false);
        setIsDeleteModal(false);
        setConfirmUser('');
    }


    const userStatusUpdate = () => {
        let params = {}

        if (isDeleteModal) {
            params.deleteUserId = id;
            handleClose();
            deleteUserService(params).then(res => {
                let { status, data } = resHandle(res)
                if (status) {
                    toast.success(data.message);
                    history.push("/asker-management")
                }
            })
        } else {
            params.userId = id
            params.status = userStatus == 1 ? 2 : 1;
            handleClose();
            updateStatus(params).then(res => {
                let { status, data } = resHandle(res)
                if (status) {
                    toast.success(data.message);
                    handleGetUserById()
                }
            })
        }


    }




    let { userDetailsArr, name, lastName, mobile, email, country, twitter, facebook, instagram, linkedIn, youtube, joiningdate,
        DOB, tiktok, Website, topic, totalAsk, totalOutExpertiseAsk, solver, totalActiveAsk, totalInvalidAsk,
        askSolvedCount, profileImage, countryCode } = state
    return (
        <div className="page_wrapper">


            <Modal show={confirmModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center">Are you sure you want to delete this user?</p>
                    <div className="d-flex justify-content-center pb-4">
                        <button onClick={handleClose} className="btn btn-dark btn-sm pl-5 pr-5">No</button>
                        <button onClick={userStatusUpdate} className="btn btn-danger btn-sm ml-3 pl-5 pr-5">Yes</button>
                    </div>
                </Modal.Body>
            </Modal>



            <Modal show={statusModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center">Are you sure you want to {confirmUser.status == 1 ? 'inactive' : 'active'} this user?</p>
                    <div className="d-flex justify-content-center pb-4">
                        <button onClick={handleClose} className="btn btn-dark btn-sm pl-5 pr-5">No</button>
                        <button onClick={userStatusUpdate} className="btn btn-danger btn-sm ml-3 pl-5 pr-5">Yes</button>
                    </div>
                </Modal.Body>
            </Modal>



            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="row">
                <div className="col">
                    <div className="askerview-wrapper">

                        <div className="d_action">
                            {userStatus == 2 ? <span onClick={() => setStatusModal(true)}><i className="fas fa-unlock text-success" /></span>
                                :
                                <span onClick={() => setStatusModal(true)}><i className="fas fa-ban text-warning" /></span>}

                            <span onClick={() => (setConfirmModal(true), setIsDeleteModal(true))}><i className="fas fa-trash-alt" /></span>
                        </div>



                        <div className="imgwrapper icon img large">
                            {profileImage == "" ? <img className="" src={`https://Sagoon-dev.s3.ap-south-1.amazonaws.com/ask/file_1622617549736_imgplaceholder.png`} /> :
                                <img className="userimg"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://Sagoon-dev.s3.ap-south-1.amazonaws.com/ask/file_1622617549736_imgplaceholder.png`;
                                    }}
                                    src={validurl.test(profileImage) ? profileImage : (siteSetting.api.s3_url + profileImage)} />}
                        </div>
                        <table className="table table-borderless viewtable">
                            <tr>
                                <td>Name</td>
                                <td>-</td>
                                <td>{name ? name + ' ' + lastName : '-'} </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>-</td>
                                <td>{email ? email : '-'}</td>
                            </tr>
                            <tr>
                                <td>DOB</td>
                                <td>-</td>
                                <td>{DOB ? moment(DOB).format("MM-DD-YYYY") : '-'}</td>
                            </tr>
                            <tr>
                                <td>Twitter</td>
                                <td>-</td>
                                <td>{twitter ? twitter : '-'}</td>
                            </tr>
                            <tr>
                                <td>Instagram</td>
                                <td>-</td>
                                <td>{instagram ? instagram : '-'}</td>
                            </tr>
                            <tr>
                                <td>Tiktok</td>
                                <td>-</td>
                                <td>{tiktok ? tiktok : '-'}</td>
                            </tr>
                            <tr>
                                <td>Website</td>
                                <td>-</td>
                                <td>{Website ? Website : '-'}</td>
                            </tr>
                            <tr>
                                <td>No. of Topic Followed</td>
                                <td>-</td>
                                <td>{topic ? topic.length : '-'}</td>
                            </tr>
                            <tr>
                                <td>Total Asked</td>
                                <td>-</td>
                                <td>{totalAsk ? totalAsk : '0'}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="col">
                    <div className="askerview-wrapper">
                        <table className="table table-borderless viewtable">
                            <tr>
                                <td>Phone number</td>
                                <td>-</td>
                                <td>{countryCode} {mobile ? mobile : '-'}</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>-</td>
                                <td>{country ? country : '-'}</td>
                            </tr>
                            <tr>
                                <td>Facebook</td>
                                <td>-</td>
                                <td>{facebook ? facebook : '-'}</td>
                            </tr>
                            <tr>
                                <td>Linkedin</td>
                                <td>-</td>
                                <td>{linkedIn ? linkedIn : '-'}</td>
                            </tr>

                            <tr>
                                <td>YouTube</td>
                                <td>-</td>
                                <td>{youtube ? youtube : '-'}</td>
                            </tr>
                            <tr>
                                <td>Joining Date</td>
                                <td>-</td>
                                <td>{moment(joiningdate).format("MM-DD-YYYY")}</td>
                            </tr>
                            <tr>
                                <td>No. of Solver Followed</td>
                                <td>-</td>
                                <td>{solver ? solver.length : '0'}</td>
                            </tr>
                            {/* <tr>
                                <td>Total Active Ask</td>
                                <td>-</td>
                                <td>{totalActiveAsk ? totalActiveAsk : '0'}</td>
                            </tr>
                            <tr>
                                <td>Total Invalid Ask</td>
                                <td>-</td>
                                <td>{totalInvalidAsk ? totalInvalidAsk : '0'}</td>
                            </tr>
                            <tr>
                                <td>Total Close Ask</td>
                                <td>-</td>
                                <td>{askSolvedCount && '0'}</td>
                            </tr>
                            <tr>
                                <td>Total Out of Expertise Ask</td>
                                <td>-</td>
                                <td>{totalOutExpertiseAsk ? totalOutExpertiseAsk : '0'}</td>
                            </tr>
                            <tr>
                                <td>Total Live Session</td>
                                <td>-</td>
                                <td>{'0'}</td>
                            </tr> */}
                        </table>
                    </div>
                </div>
            </div>





            <Tabs defaultActiveKey="1" className="mt-5 cm_tabs">

                <Tab eventKey="1" title="Followers">
                    <div className="askerview-wrapper">
                        <h4>Followers</h4>
                        <div className="">
                            <table className="table  table-bordered user-table table-hover align-items-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th></th>
                                        <th>Name</th>
                                        <th>follower</th>
                                        <th>following</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {followers.map((item, i) => <tr key={item._id}>
                                        <td>{(followerPage - 1) * limit + (i + 1)}</td>
                                        <td><img className="userimg" src={checkUrlType(item.profileImage)} /></td>
                                        <td>{item.name} {item.lastName}</td>
                                        <td>{item.followerCount}</td>
                                        <td>{item.followingCount}</td>
                                        <td><Link to={`/solver-view/${item.userId}`}><i className='fas fa-eye text-primary' /></Link></td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>

                        {followers?.length ? <div className="text-center">
                            <Pagination
                                activePage={followerPage}
                                itemsCountPerPage={limit}
                                totalItemsCount={followersCount}
                                pageRangeDisplayed={4}
                                onChange={e => setFollowersPage(e)}
                            />
                        </div> : ''
                        }
                    </div>
                </Tab>



                <Tab eventKey="2" title="Topics Following">
                    <div className="askerview-wrapper">
                        <h4>Topics Following</h4>
                        <div className="">

                            <table className="table  table-bordered user-table table-hover align-items-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Topic Name</th>
                                        <th>Domain Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topicsfollow.map((item, i) => <tr key={item._id}>
                                        <td>{(topicsfollowPage - 1) * limit + (i + 1)}</td>
                                        <td>{item.topicName}</td>
                                        <td>{item.domainName}</td>
                                        <td><Link to={`/edit-notification/${item.topicId}`}><i className='fas fa-eye text-primary' /></Link></td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>

                        {topicsfollow?.length ? <div className="text-center">
                            <Pagination
                                activePage={topicsfollowPage}
                                itemsCountPerPage={limit}
                                totalItemsCount={topicsfollowCount}
                                pageRangeDisplayed={4}
                                onChange={e => setTopicsfollowPage(e)}
                            />
                        </div> : ''
                        }
                    </div>
                </Tab>

            </Tabs>




        </div>
    )
}

export default AskerView;



