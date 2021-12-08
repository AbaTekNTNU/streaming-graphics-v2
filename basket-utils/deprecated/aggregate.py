import json


def getVersion(version):
    versionFile = open("data/%s/matchData.json" % version['version'], "r")
    versionData = json.loads(versionFile.read())
    versionFile.close()
    return versionData


def getLastMatchDetails(matchId):
    summaryFile = open("data/summary.json", "r")
    summaryData = json.loads(summaryFile.read())
    summaryFile.close()

    sortedVersions = sorted(summaryData['versions'],
                            key=lambda x: x['created'], reverse=True)

    lastCommitedVersion = sortedVersions[0]

    return getVersion(lastCommitedVersion)
