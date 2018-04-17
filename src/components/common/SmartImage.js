import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Image, Animated, StyleSheet, View, Platform} from "react-native";
import {BlurView, FileSystem} from "expo";
import SHA1 from "crypto-js/sha1";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default class SmartImage extends Component {
    static propTypes = {
        style?: PropTypes.style,
        preview?: PropTypes.string,
        uri: PropTypes.string,
    }
    
    constructor(props) {
        super(props)

        this.state = {
            uri: null,
            intensity: new Animated.Value(100),
        }
    }

    async componentWillMount() {
        const {preview, uri} = this.props;
        const entry = await getCacheEntry(uri);
        if (!entry.exists) {
            if (preview) {
                this.setState({ uri: preview });
            }
            if (uri.startsWith("file://")) {
                await FileSystem.copyAsync({ from: uri, to: entry.path });
            } else {
                await FileSystem.downloadAsync(uri, entry.path);
            }
        }
        this.setState({ uri: entry.path });
    }

    onLoadEnd(uri) {
        if (!uri.startsWith("data:")) {
            const intensity = new Animated.Value(100);
            this.setState({ intensity });
            Animated.timing(intensity, { duration: 300, toValue: 0, useNativeDriver: Platform.OS === "ios" }).start();
        }
    }

    render() {
        const {style} = this.props;
        const {uri, intensity} = this.state;
        return (
            <View {...{style}}>
                {
                    uri && (
                        <Image
                            source={{ uri }}
                            resizeMode="cover"
                            style={computedStyle}
                            onLoadEnd={() => this.onLoadEnd(uri)}
                        />
                    )
                }
                {
                    Platform.OS === "ios" && <AnimatedBlurView tint="default" style={computedStyle} {...{intensity}} />
                }
            </View>
        );
    }
}

const getCacheEntry = async (uri) => {
    const ext = uri.substring(uri.lastIndexOf("."), uri.indexOf("?") === -1 ? undefined : uri.indexOf("?"));
    const path = FileSystem.cacheDirectory + SHA1(uri) + ext;
    const info = await FileSystem.getInfoAsync(path);
    const {exists} = info;
    return { exists, path };
}