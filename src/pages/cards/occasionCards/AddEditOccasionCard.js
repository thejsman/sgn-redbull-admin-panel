import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { resHandle } from "../../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap"
import { Loader } from '../../../components/common/loader';
import { PhotoshopPicker } from "react-color";


const AddEditOccasionCard = () => {
    const history = useHistory();
    const { id } = useParams();
    // const history = useHistory()
    // const { id } = useParams()
    const [relationshipName, setRelationshipName] = useState('')
    const [loader, setLoader] = useState(false);
    const [color, setColor] = useState("#194D33");
    const [headingColor, setHeadingColor] = useState("");
    const [isShowHeadingColorPicker, setIsShowHeadingColorPicker] = useState(false);
    const [color1, setColor1] = useState("#194D33");
    const [ctaColor, setCtaColor] = useState("");
    const [isShowCtaColorPicker, setIsShowCtaColorPicker] = useState(false);
    const [color2, setColor2] = useState("#194D33");
    const [ctaBGColor, setCtaBGColor] = useState("");
    const [isShowCtaBGColorPicker, setIsShowCtaBGColorPicker] = useState(false);
    const [color3, setColor3] = useState("#194D33");
    const [contentColor, setContentColor] = useState("");
    const [isShowContentColorPicker, setIsShowContentColorPicker] = useState(false);
    const [color4, setColor4] = useState("#194D33");
    const [lottieColor, setLottieColor] = useState("");
    const [isShowLottieColorPicker, setIsShowLottieColorPicker] = useState(false);



    const breadcrumb = [
        { link: '/cards/occassion', linkText: 'Occasion card' },
        { link: '', linkText: 'Add Occasion Card' }
    ]

    useEffect(() => {
        // if (window.location.pathname == "/occasion-card/create") {
        //     setIsAddFamilyRelationship(true);
        // }
        // if (window.location.pathname !== "/occasion-card/create") {
        //     setLoader(true);
        //     handleGetRealtionShipById(id);

        // }
    }, []);




    // All function End



    return (


        <div className='page_wrapper'>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className='twocol sb page_header'>
                <h2>Add Occasion Card </h2>
            </div>
            {loader ? (
                <Loader />
            ) : (
                <form className='form-controller chosen'>
                    <div className='form-group row'>
                        <div className='col'>
                            <label>Card Name</label>
                            <input
                                type='text'
                                className='form-control'
                                name='relationshipName'

                            />

                        </div>

                    </div>

                    <div className='rounded-sm pb-3 bgcolor'>
                        <label className="pl-1 "># Heading Detail</label>
                        <div className="form-group row m-1">
                            <div className='col'>
                                <label>Text</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='relationshipName'

                                />

                            </div>
                            <div className='col'>
                                <label>Text Color</label>
                                <div className="p-2 rounded-sm border border-white" style={{
                                    backgroundColor: headingColor,
                                    transition: "ease all 500ms",
                                    cursor: 'pointer',
                                    height: '40px',

                                }}
                                    onClick={e => {
                                        setIsShowHeadingColorPicker(true);
                                    }}
                                > {headingColor ? headingColor : "Click here"}</div>
                                {isShowHeadingColorPicker && (
                                    <PhotoshopPicker
                                        color={color}
                                        onChangeComplete={color => {
                                            setColor(color.hex);
                                        }}
                                        onAccept={() => {
                                            console.log('color', color)
                                            setHeadingColor(color);
                                            setIsShowHeadingColorPicker(false);
                                        }}
                                        onCancel={() => {
                                            setIsShowHeadingColorPicker(false);
                                        }}
                                    />
                                )}
                                <div>

                                </div>





                            </div>
                        </div>

                    </div>


                    <div className='rounded-sm pb-3 bgcolor mt-4'>
                        <label className="pl-1 "># CTA Detail</label>
                        <div className="form-group row m-1">
                            <div className='col'>
                                <label>Text</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='relationshipName'

                                />

                            </div>
                            <div className='col'>
                                <label>Text Color</label>
                                <div className="p-2 mt-1 border border-white rounded-sm" style={{
                                    backgroundColor: ctaColor,
                                    transition: "ease all 500ms",
                                    cursor: 'pointer',
                                    height: '40px',

                                }}
                                    onClick={e => {
                                        setIsShowCtaColorPicker(true);
                                    }}
                                > {ctaColor ? ctaColor : "Click here"}</div>
                                {isShowCtaColorPicker && (
                                    <PhotoshopPicker
                                        color={color1}
                                        onChangeComplete={color => {
                                            setColor1(color.hex);
                                        }}
                                        onAccept={() => {
                                            console.log('color', color1)
                                            setCtaColor(color1);
                                            setIsShowCtaColorPicker(false);
                                        }}
                                        onCancel={() => {
                                            setIsShowCtaColorPicker(false);
                                        }}
                                    />
                                )}
                                <div>

                                </div>





                            </div>
                            <div className='col'>
                                <label>Background Color</label>
                                <div className="p-2 mt-1 border border-white rounded-sm" style={{
                                    backgroundColor: ctaBGColor,
                                    transition: "ease all 500ms",
                                    cursor: 'pointer',
                                    height: '40px',

                                }}
                                    onClick={e => {
                                        setIsShowCtaBGColorPicker(true);
                                    }}
                                > {ctaBGColor ? ctaBGColor : "Click here"}</div>
                                {isShowCtaBGColorPicker && (
                                    <PhotoshopPicker
                                        color={color2}
                                        onChangeComplete={color => {
                                            setColor2(color.hex);
                                        }}
                                        onAccept={() => {
                                            console.log('color', color2)
                                            setCtaBGColor(color2);
                                            setIsShowCtaBGColorPicker(false);
                                        }}
                                        onCancel={() => {
                                            setIsShowCtaBGColorPicker(false);
                                            // setColor(color.hex);
                                        }}
                                    />
                                )}
                                <div>

                                </div>





                            </div>
                            <div className='col'>
                                <label>Action</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='relationshipName'

                                />

                            </div>

                        </div>

                    </div>

                    <div className='rounded-sm pb-3 bgcolor  mt-4'>
                        <label className="pl-1 "># Content Detail</label>
                        <div className="form-group row m-1">
                            <div className='col'>
                                <label>Text</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='relationshipName'

                                />

                            </div>
                            <div className='col'>
                                <label>Text Color</label>
                                <div className="p-2 rounded-sm border border-white" style={{
                                    backgroundColor: contentColor,
                                    transition: "ease all 500ms",
                                    cursor: 'pointer',
                                    height: '40px',

                                }}
                                    onClick={e => {
                                        setIsShowContentColorPicker(true);
                                    }}
                                > {contentColor ? contentColor : "Click here"}</div>
                                {isShowContentColorPicker && (
                                    <PhotoshopPicker
                                        color={color3}
                                        onChangeComplete={color => {
                                            setColor3(color.hex);
                                        }}
                                        onAccept={() => {
                                            console.log('color', color3)
                                            setContentColor(color3);
                                            setIsShowContentColorPicker(false);

                                        }}
                                        onCancel={() => {
                                            setIsShowContentColorPicker(false);
                                        }}
                                    />
                                )}
                                <div>

                                </div>





                            </div>
                        </div>

                    </div>

                    <div className='rounded-sm pb-3 bgcolor  mt-4'>
                        <label className="pl-1 "># Lottie Detail</label>
                        <div className="form-group row m-1">

                            <div className='col'>
                                <label>Background Color</label>
                                <div className="p-2 rounded-sm border border-white" style={{
                                    backgroundColor: lottieColor,
                                    transition: "ease all 500ms",
                                    cursor: 'pointer',
                                    height: '40px',

                                }}
                                    onClick={e => {
                                        setIsShowLottieColorPicker(true);
                                    }}
                                > {lottieColor ? lottieColor : "Click here"}</div>
                                {isShowLottieColorPicker && (
                                    <PhotoshopPicker
                                        color={color4}
                                        onChangeComplete={color => {
                                            setColor4(color.hex);
                                        }}
                                        onAccept={() => {
                                            console.log('color', color)
                                            setLottieColor(color4);
                                            setIsShowLottieColorPicker(false);

                                        }}
                                        onCancel={() => {
                                            setIsShowLottieColorPicker(false);
                                            // setColor(color.hex);
                                        }}
                                    />
                                )}
                                <div>

                                </div>





                            </div>
                            <div className='col'>
                                <label>Background Json File</label>
                                <div className="custom-file">
                                    <input id="input-file" type="file"
                                        className="custom-file-input"
                                    />
                                    <label className="custom-file-label" htmlFor="input-file">
                                        Choose file
                                    </label>
                                </div>

                            </div>
                            <div className='col'>
                                <label>Graphic Json File</label>
                                <div className="custom-file">
                                    <input id="input-file" type="file"
                                        className="custom-file-input"
                                    />
                                    <label className="custom-file-label" htmlFor="input-file">
                                        Choose file
                                    </label>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className='button300'>
                        <button
                            type='button'
                            className='btn btn-primary rounded-pill'


                        >Submit</button>
                    </div>
                </form>
            )
            }
            <ToastContainer />
        </div >


    )
}

export default AddEditOccasionCard
