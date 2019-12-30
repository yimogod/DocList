package ubox

func ParseUboxBaseData(uboxID string) {
	//pipe的用法不稳定, 获取的结果时好时坏, 保留用法，看研究下怎么回事
	//itemM := []bson.M{
	//{"$match": bson.M{"ubox": uboxID, "frame": bson.M{"$gte": section.StartFrame, "$lte": section.EndFrame}}},
	//}
	//colItemBase.Pipe(itemM).All(&itemList)
}
