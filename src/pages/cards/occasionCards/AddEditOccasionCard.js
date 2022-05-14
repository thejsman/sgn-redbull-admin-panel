import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { resHandle } from "../../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap"
import { Loader } from '../../../components/common/loader';
import { PhotoshopPicker } from "react-color";
import { createCardOccasion, getCardOccasionByName, updateCardOccasion } from '../../../services/ApiCardOccasion'



const AddEditOccasionCard = () => {
    const history = useHistory();
    const { id } = useParams();

    const [cardName, setCardName] = useState('')
    const [cardNameErr, setCardNameErr] = useState('')

    const [color, setColor] = useState("#194D33");
    const [headingColor, setHeadingColor] = useState("");
    const [headingColorErr, setHeadingColorErr] = useState('');
    const [headingText, setHeadingText] = useState("");
    const [headingTextErr, setHeadingTextErr] = useState('');
    const [isShowHeadingColorPicker, setIsShowHeadingColorPicker] = useState(false);

    const [color1, setColor1] = useState("#194D33");
    const [ctaText, setCtaText] = useState("");
    const [ctaTextErr, setCtaTextErr] = useState('')
    const [ctaColor, setCtaColor] = useState("");
    const [ctaColorErr, setCtaColorErr] = useState('')
    const [isShowCtaColorPicker, setIsShowCtaColorPicker] = useState(false);

    const [color2, setColor2] = useState("#194D33");
    const [ctaBGColor, setCtaBGColor] = useState("");
    const [ctaBGErr, setCtaBGErr] = useState('')
    const [isShowCtaBGColorPicker, setIsShowCtaBGColorPicker] = useState(false);

    const [ctaAction, setCtaAction] = useState("");
    const [ctaActionErr, setCtaActionErr] = useState('')
    const [ctaActionTitle, setCtaActionTitle] = useState("");
    const [ctaActionTitleErr, setCtaActionTitleErr] = useState('')


    const [color3, setColor3] = useState("#194D33");
    const [contentColor, setContentColor] = useState("");
    const [contentColorErr, setContentColorErr] = useState('')
    const [contentText, setContentText] = useState("");
    const [contentTextErr, setContentTextErr] = useState('')
    const [isShowContentColorPicker, setIsShowContentColorPicker] = useState(false);

    const [color4, setColor4] = useState("#194D33");
    const [lottieColor, setLottieColor] = useState("");
    const [lottieColorErr, setLottieColorErr] = useState('')
    const [isShowLottieColorPicker, setIsShowLottieColorPicker] = useState(false);

    const [loader, setLoader] = useState(false);
    const [lottieBackgroundBase64, setLottieBackgroundBase64] = useState('');
    const [lottieGraphicBase64, setLottieGraphicBase64] = useState('');
    const [lottieBackgroundFileName, setLottieBackgroundFileName] = useState('');
    const [lottieGraphicFileName, setLottieGraphicFileName] = useState('');
    const [lottieBackgroundFileNameErr, setLottieBackgroundFileNameErr] = useState('');
    const [lottieGraphicFileNameErr, setLottieGraphicFileNameErr] = useState('');

    const [editImageGraphic, setEditImageGraphic] = useState(false);
    const [editImageBackground, setEditImageBackground] = useState(false);
    const [status, setStatus] = useState("true");
    const [isSubmit, setIsSubmit] = useState(false);
    const [isAddCard, setIsAddCard] = useState(false);


    const visibilityData = [{ label: "Universal", value: 0 }, { label: "India", value: 91 }, { label: "Nepal", value: 977 }];

    const [visibility, setVisibility] = useState([]);

    const onChangeCheckbox = (e, item) => {
        let temp = visibility;
        if (e.target.checked == false) {
            temp = temp.filter((v) => v.value !== item.value);
        } else {
            if (temp.findIndex((i) => i.value == item.value) == -1) {
                temp.push(item);
            }
        }
        setVisibility([...temp]);
    }

    const breadcrumb = [
        { link: '/card/occasions/', linkText: 'Occasion card' },
        { link: '', linkText: 'Add Occasion Card' }
    ]

    const albhaRegEx = /^[a-zA-z]+$/;
    const albhaNumericRegEx = /^[A-Za-z0-9]+$/;
    const handleValidate = () => {
        let validate = true

        if (!cardName.replace(/\s+/g, '')) {
            setCardNameErr("Card name is required")
            validate = false
        } else if (!albhaNumericRegEx.test(cardName)) {
            setCardNameErr("Special characters and spaces are not allowed")
            validate = false
        } else {
            setCardNameErr("")
        }

        if (!headingColor.replace(/\s+/g, '')) {
            setHeadingColorErr("Heading Color is required")
            validate = false
        } else {
            setHeadingColorErr("")
        }

        if (!headingText.replace(/\s+/g, '')) {
            setHeadingTextErr("Heading Text is required")
            validate = false
        } else {
            setHeadingTextErr("")
        }

        if (!ctaText.replace(/\s+/g, '')) {
            setCtaTextErr("CTA Text is required")
            validate = false
        } else {
            setCtaTextErr("")
        }

        if (!ctaColor.replace(/\s+/g, '')) {
            setCtaColorErr("CTA Color is required")
            validate = false
        } else {
            setCtaColorErr("")
        }

        if (!ctaBGColor.replace(/\s+/g, '')) {
            setCtaBGErr("CTA Background Color is required")
            validate = false
        } else {
            setCtaBGErr("")
        }

        if (!ctaAction.replace(/\s+/g, '')) {
            setCtaActionErr("CTA Action is required")
            validate = false
        } else {
            setCtaActionErr("")
        }

        if (!ctaActionTitle.replace(/\s+/g, '')) {
            setCtaActionTitleErr("CTA Action Title is required")
            validate = false
        } else {
            setCtaActionTitleErr("")
        }


        if (!contentText.replace(/\s+/g, '')) {
            setContentTextErr("Content Text is required")
            validate = false
        } else {
            setContentTextErr("")
        }

        if (!contentColor.replace(/\s+/g, '')) {
            setContentColorErr("Content Color is required")
            validate = false
        } else {
            setContentColorErr("")
        }

        if (!lottieColor.replace(/\s+/g, '')) {
            setLottieColorErr("Lottie Backgroud Color is required")
            validate = false
        } else {
            setLottieColorErr("")
        }

        if (isAddCard && !lottieBackgroundBase64.replace(/\s+/g, '')) {
            setLottieBackgroundFileNameErr("Background json file is required")
            validate = false
        } else {
            setLottieBackgroundFileNameErr("")
        }

        if (isAddCard && !lottieGraphicBase64.replace(/\s+/g, '')) {
            setLottieGraphicFileNameErr("Graphic json file is required")
            validate = false
        } else {
            setLottieGraphicFileNameErr("")
        }

        return validate
    }

    const handleUpload = e => {
        let reader = new FileReader()
        let file = e.target.files[0]
        console.log('filefile', file)
        reader.addEventListener(
            'load',
            () => {
                if (e.target.id == "lottieBackground") {
                    setLottieBackgroundBase64(reader.result);
                    setLottieBackgroundFileName(file.name);
                    setLottieBackgroundFileNameErr("")
                    setEditImageBackground(true);

                } else {
                    setLottieGraphicBase64(reader.result);
                    setLottieGraphicFileName(file.name);
                    setLottieGraphicFileNameErr("");
                    setEditImageGraphic(true);
                }

            },
        )
        if (file) {
            reader.readAsDataURL(file)
        }
    }


    useEffect(() => {
        if (window.location.pathname == "/card/occasions/create") {
            setIsAddCard(true);
        }
        if (window.location.pathname !== "/card/occasions/create") {
            setLoader(true);
            handleGetCardDetailById(id);

        }
    }, []);



    const handleGetCardDetailById = (id) => {
        let params = {
            cardOccasionName: id,
        };
        getCardOccasionByName(params).then((res) => {
            let { status, data } = resHandle(res);
            console.log(status, data, "datadatadatadatadata");
            if (status === 200) {
                setLoader(false);
                setCardName(data.cardName);
                setStatus(data.status);


                setHeadingText(data?.heading?.text);
                setHeadingColor(data?.heading?.textColor);
                setColor(data?.heading?.textColor);

                setContentText(data.content.text);
                setContentColor(data.content.textColor);
                setColor3(data.content.textColor);


                setCtaText(data.cta.text);
                setCtaColor(data.cta.textColor);
                setColor1(data.cta.textColor);
                setCtaBGColor(data.cta.backgroundColor);
                setColor2(data.cta.backgroundColor);
                setCtaAction(data.cta.action);
                setCtaActionTitle(data.cta.actionTitle);

                setLottieBackgroundBase64(data.lottie.lottieBackground);
                setColor4(data.lottie.backgroundColor);
                setLottieColor(data.lottie.backgroundColor);
                setLottieGraphicBase64(data.lottie.lottieGraphic);
                setLottieBackgroundFileName(data.lottie.lottieBackgroundFileName);
                setLottieGraphicFileName(data.lottie.lottieGraphicFileName);

                let arr = [];
                if (data.visibility) {
                    arr = data.visibility.map(e => {
                        let index = visibilityData.findIndex((item) => item.value == e);
                        return visibilityData[index];
                    })
                }

                setVisibility(arr);
                console.log('arrarrarr', arr)


            } else {
                setLoader(false);
            }
        }).catch((err) => {
            debugger
            setLoader(false);
            toast.error("Sorry, a technical error occurred! Please try again later")
        });
    };


    const handleUpdateCardOccasion = e => {
        e.preventDefault()
        if (handleValidate()) {
            setIsSubmit(true);
            let createObj = {
                cardIdentifier: "cardIdentifier",
                cardName: cardName,
                visibility: visibility.map(a => a.value),
                heading: {
                    text: headingText,
                    textColor: headingColor
                },
                cta: {
                    text: ctaText,
                    textColor: ctaColor,
                    backgroundColor: ctaBGColor,
                    action: ctaAction,
                    actionTitle: ctaActionTitle
                },
                content: {
                    text: contentText,
                    textColor: contentColor
                },
                lottie: {
                    backgroundColor: lottieColor,
                    lottieBackground: lottieBackgroundBase64,
                    lottieBackgroundFileName: lottieBackgroundFileName,
                    lottieGraphic: lottieGraphicBase64,
                    lottieGraphicFileName: lottieGraphicFileName

                },
                status: status
            }


            console.log("createObj---", createObj);
            updateCardOccasion(createObj).then((res) => {
                let { status, data } = resHandle(res);
                setIsSubmit(false);
                if (status === 200) {
                    toast.success(data.message);
                    history.push("/card/occasions/");
                } else {
                    toast.success(data.message);
                }
            }).catch((err) => {
                setLoader(false)
                toast.error("Sorry, a technical error occurred! Please try again later")
            });

        }
    }


    const handleCreateCardOccasion = e => {
        e.preventDefault()
        if (handleValidate()) {
            setIsSubmit(true);
            let createObj = {
                cardIdentifier: "cardIdentifier",
                cardName: cardName,
                visibility: visibility.map(a => a.value),
                heading: {
                    text: headingText,
                    textColor: headingColor
                },
                cta: {
                    text: ctaText,
                    textColor: ctaColor,
                    backgroundColor: ctaBGColor,
                    action: ctaAction,
                    actionTitle: ctaActionTitle
                },
                content: {
                    text: contentText,
                    textColor: contentColor
                },
                lottie: {
                    backgroundColor: lottieColor,
                    lottieBackground: lottieBackgroundBase64,
                    lottieBackgroundFileName: lottieBackgroundFileName,
                    lottieGraphic: lottieGraphicBase64,
                    lottieGraphicFileName: lottieGraphicFileName
                },
                status: status
            }
            console.log("createObj---", createObj);
            createCardOccasion(createObj).then((res) => {
                let { status, data } = resHandle(res);
                setIsSubmit(false);
                if (status === 200) {
                    toast.success(data.message);
                    history.push("/card/occasions/");
                } else {
                    toast.success(data.message);
                }
            }).catch((err) => {
                setLoader(false)
                toast.error("Sorry, a technical error occurred! Please try again later")
            });

        }
    }

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
                                name='cardName'
                                autocapitalize="none"
                                value={cardName}
                                onChange={e => (
                                    setCardName(e.target.value), setCardNameErr('')
                                )}
                            />
                            {cardNameErr ? (
                                <div className='inlineerror'>{cardNameErr} </div>
                            ) : (
                                ''
                            )}

                        </div>

                        <div className="col">
                            <label>Status</label>
                            <select
                                className="form-control"
                                name="cars"
                                value={status}
                                onChange={(e) => (
                                    setStatus(e.target.value)
                                )}
                            >
                                <option value="true">Activate</option>
                                <option value="false">De-Activate</option>
                            </select>

                        </div>

                    </div>
                    <div className='rounded-sm pb-3 bgcolor'>
                        <label className="pl-1 "># Visibility</label>
                        <div className="form-group row m-1">
                            {visibilityData.map((item, index) => {
                                return (
                                    <div className="col" key={index}>
                                        <div className="form-check">
                                            <input type="checkbox"
                                                id={`custom-checkbox-${index}`}
                                                className="form-check-input"
                                                checked={visibility?.some((d) => d.value == item.value)}
                                                value={visibility}
                                                onChange={(e) => {
                                                    onChangeCheckbox(e, item);
                                                }}
                                            />
                                            <label htmlFor={`custom-checkbox-${index}`} className="form-check-label"  > {item.label} ({item.value})
                                            </label>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                    </div>

                    <div className='rounded-sm pb-3  mt-4 bgcolor'>
                        <label className="pl-1 "># Heading Detail</label>
                        <div className="form-group row m-1">
                            <div className='col'>
                                <label>Text</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='headingText'
                                    value={headingText}
                                    onChange={e => (
                                        setHeadingText(e.target.value), setHeadingTextErr('')
                                    )}
                                />
                                {headingTextErr ? (
                                    <div className='inlineerror'>{headingTextErr} </div>
                                ) : (
                                    ''
                                )}

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
                                        setHeadingColorErr("");
                                    }}
                                > {headingColor ? headingColor : "Click here"}</div>
                                {headingColorErr ? (
                                    <div className='inlineerror'>{headingColorErr} </div>
                                ) : (
                                    ''
                                )}
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
                                    name='ctaText'
                                    value={ctaText}
                                    onChange={e => (
                                        setCtaText(e.target.value), setCtaTextErr('')
                                    )}
                                />
                                {ctaTextErr ? (
                                    <div className='inlineerror'>{ctaTextErr} </div>
                                ) : (
                                    ''
                                )}

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
                                        setCtaColorErr("");
                                    }}
                                > {ctaColor ? ctaColor : "Click here"}</div>
                                {ctaColorErr ? (
                                    <div className='inlineerror'>{ctaColorErr} </div>
                                ) : (
                                    ''
                                )}
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
                                        setCtaBGErr("");
                                    }}
                                > {ctaBGColor ? ctaBGColor : "Click here"}</div>
                                {ctaBGErr ? (
                                    <div className='inlineerror'>{ctaBGErr} </div>
                                ) : (
                                    ''
                                )}
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
                                    name='action'
                                    value={ctaAction}
                                    onChange={e => (
                                        setCtaAction(e.target.value), setCtaActionErr('')
                                    )}
                                />
                                {ctaActionErr ? (
                                    <div className='inlineerror'>{ctaActionErr} </div>
                                ) : (
                                    ''
                                )}

                            </div>
                            <div className='col'>
                                <label>Action Title</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='action'
                                    value={ctaActionTitle}
                                    onChange={e => (
                                        setCtaActionTitle(e.target.value), setCtaActionTitleErr('')
                                    )}
                                />
                                {ctaActionTitleErr ? (
                                    <div className='inlineerror'>{ctaActionTitleErr} </div>
                                ) : (
                                    ''
                                )}

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
                                    name='contentText'
                                    value={contentText}
                                    onChange={e => (
                                        setContentText(e.target.value), setContentTextErr('')
                                    )}
                                />
                                {contentTextErr ? (
                                    <div className='inlineerror'>{contentTextErr} </div>
                                ) : (
                                    ''
                                )}

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
                                        setContentColorErr("");
                                    }}
                                > {contentColor ? contentColor : "Click here"}</div>
                                {contentColorErr ? (
                                    <div className='inlineerror'>{contentColorErr} </div>
                                ) : (
                                    ''
                                )}
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
                                        setLottieColorErr("");
                                    }}
                                > {lottieColor ? lottieColor : "Click here"}</div>
                                {lottieColorErr ? (
                                    <div className='inlineerror'>{lottieColorErr} </div>
                                ) : (
                                    ''
                                )}
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
                                    <input id="lottieBackground" type="file"
                                        className="custom-file-input"
                                        name="lottieBackgroundFileName"
                                        accept=".json"
                                        onChange={handleUpload} />
                                    <label className="custom-file-label" htmlFor="lottieBackground">
                                        {lottieBackgroundFileName ? lottieBackgroundFileName : 'Choose file'}
                                    </label>
                                </div>
                                {(!isAddCard && lottieBackgroundBase64) && <a href={lottieBackgroundBase64} download={lottieBackgroundBase64.includes("https://") ? lottieBackgroundBase64 : lottieBackgroundFileName} target="blank"> {lottieBackgroundBase64.includes("https://") ? lottieBackgroundBase64 : lottieBackgroundFileName} </a>}
                                {lottieBackgroundFileNameErr && <div className='inlineerror'>{lottieBackgroundFileNameErr} </div>}
                            </div>
                            <div className='col'>
                                <label>Graphic Json File</label>
                                <div className="custom-file">
                                    <input id="lottieGraphic" type="file"
                                        className="custom-file-input"
                                        accept=".json"
                                        name="lottieGraphicFileName"
                                        onChange={handleUpload}
                                    />
                                    <label className="custom-file-label" htmlFor="lottieGraphic">
                                        {lottieGraphicFileName ? lottieGraphicFileName : 'Choose file'}

                                    </label>
                                </div>
                                {(!isAddCard && lottieGraphicBase64) && <a href={lottieGraphicBase64} target="blank" download={lottieGraphicBase64.includes("https://") ? lottieGraphicBase64 : lottieGraphicFileName}> {lottieGraphicBase64.includes("https://") ? lottieGraphicBase64 : lottieGraphicFileName} </a>}
                                {lottieGraphicFileNameErr && <div className='inlineerror'>{lottieGraphicFileNameErr} </div>}

                            </div>
                        </div>

                    </div>

                    <div className='button300'>
                        {isAddCard ? (
                            <button
                                type='button'
                                className='btn btn-primary rounded-pill'
                                onClick={handleCreateCardOccasion}
                                disabled={isSubmit ? 'disabled' : ''}

                            >
                                {isSubmit ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                )
                                    : ('')
                                }
                                {isSubmit ? ' Submitting..' : 'Create'}


                            </button>

                        ) : (
                            <button
                                type='button'
                                className='btn btn-primary rounded-pill'
                                onClick={handleUpdateCardOccasion}
                                disabled={isSubmit ? 'disabled' : ''}
                            >
                                {isSubmit ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                )
                                    : ('')
                                }
                                {isSubmit ? ' Submitting..' : 'Update'}

                            </button>
                        )}
                    </div>
                </form>
            )
            }
            <ToastContainer />
        </div >


    )
}

export default AddEditOccasionCard
