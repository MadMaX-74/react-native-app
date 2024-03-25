import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
// import { ImageUploader } from '../../shared/ImageUploader/ImageUploader';
import { Gaps } from '../../shared/tokens';
import { Avatar } from '../../entities/user/ui/Avatar/Avatar';
import { useAtom } from 'jotai';
import { updateProfileAtom } from '../../entities/user/model/user.state';
import Button from '../../shared/Button/Button';
import * as Sharing from 'expo-sharing';
import {
	launchCameraAsync,
	MediaTypeOptions,
	useCameraPermissions,
	launchImageLibraryAsync,
	useMediaLibraryPermissions,
	PermissionStatus,
} from 'expo-image-picker';

export default function Profile() {
	const [image, setImage] = useState<string | null>(null);
	const [profile, updateProfile] = useAtom(updateProfileAtom);
	const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
	const [libraryPermissions, requestLibraryPermissions] = useMediaLibraryPermissions();

	const verifyCameraPermissions = async () => {
		if (cameraPermissions?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestCameraPermissions();
			return res.granted;
		}
		if (cameraPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert('Недостаточно прав для доступа к камере');
			return false;
		}
		return true;
	};
	const verifyMediaPermissions = async () => {
		if (libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestLibraryPermissions();
			return res.granted;
		}
		if (libraryPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert('Недостаточно прав для доступа к галерее');
			return false;
		}
		return true;
	};

	const captureAvatar = async () => {
		const isPermissionGranted = await verifyCameraPermissions();
		if (!isPermissionGranted) {
			return;
		}
		const result = await launchCameraAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});
		if (!result.assets) {
			return;
		}
		setImage(result.assets[0].uri);
	};

	const pickAvatar = async () => {
		const isPermissionGranted = await verifyMediaPermissions();
		if (!isPermissionGranted) {
			return;
		}
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});
		if (!result.assets) {
			return;
		}
		setImage(result.assets[0].uri);
	};

	const shareProfile = async () => {
		const isShaingAvailable = await Sharing.isAvailableAsync();
		if (!isShaingAvailable) {
			return;
		}
		await Sharing.shareAsync('https://purpleschool.ru', {
			dialogTitle: 'Поделиться профилем',
		});
	};

	const submitProfile = () => {
		if (!image) {
			return;
		}
		updateProfile({ photo: image });
	};

	useEffect(() => {
		if (profile && profile.profile?.photo) {
			setImage(profile.profile?.photo);
		}
	}, [profile]);

	return (
		<View>
			<View style={styles.container}>
				<Avatar image={image} />
				{/* <ImageUploader onUpload={setImage} onError={(e) => console.log(e)} /> */}
			</View>
			<Button text="Снять изображение" onPress={captureAvatar} />
			<Button text="Выбрать из галлереи" onPress={pickAvatar} />
			<Button text="Сохранить" onPress={submitProfile} />
			<Button text="Поделиться" onPress={shareProfile} />
			{image && <Image source={{ uri: image }} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: Gaps.g20,
		alignItems: 'center',
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
});
