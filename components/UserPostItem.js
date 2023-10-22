import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, FontAwesome, Feather } from "@expo/vector-icons";
import { useGetComments } from "../hooks/useGetComments";
import { useGetLikes } from "../hooks/useGetLikes";
import { Border, Color, FontFamily, FontSize } from "../styles/globalStyles";

export const UserPostItem = ({ post }) => {
  const { id, imageUrl, location, title, locationCoords, userId, date } = post;

  const [allComments] = useGetComments(id);
  const [allLikes] = useGetLikes(id);

  const navigation = useNavigation();

  const commentsNumber = allComments.length;
  const likesNumber = allLikes.length;
  const country = location.split(", ")[2];

  const handleCommentsClick = () => {
    navigation.navigate("Comments", { id, imageUrl });
  };

  const handleLocation = () => {
    navigation.navigate("Map", { locationCoords });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.descriptionContainer}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.commentsBtn}
            activeOpacity={0.5}
            onPress={handleCommentsClick}
          >
            {commentsNumber ? (
              <FontAwesome
                name="comment"
                size={24}
                color={Color.orange}
                style={{
                  transform: [{ scaleX: -1 }],
                }}
              />
            ) : (
              <FontAwesome5
                name="comment"
                size={24}
                color={Color.darkGray}
                style={{
                  transform: [{ scaleX: -1 }],
                }}
              />
            )}
            <Text
              style={{
                ...styles.commentsNumber,
                color: commentsNumber ? Color.dark : Color.darkGray,
              }}
            >
              {commentsNumber}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentsBtn} activeOpacity={0.5}>
            <Feather
              name="thumbs-up"
              size={24}
              color={likesNumber ? Color.orange : Color.darkGray}
            />
            <Text
              style={{
                ...styles.commentsNumber,
                color: likesNumber ? Color.dark : Color.darkGray,
              }}
            >
              {likesNumber}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.locationBtn}
          activeOpacity={0.5}
          onPress={handleLocation}
        >
          <Feather name="map-pin" size={24} color={Color.darkGray} />

          <Text style={styles.locationTitle}>{country}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 32,
  },
  image: {
    height: 240,
    borderRadius: Border.xs,
  },
  title: {
    fontFamily: FontFamily.robotoMedium,
    fontSize: FontSize.m,
    color: Color.dark,
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  btnContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 24,
  },
  commentsBtn: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  commentsNumber: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.m,
  },
  locationBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationTitle: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.m,
    color: Color.dark,
    textDecorationLine: "underline",
  },
});
