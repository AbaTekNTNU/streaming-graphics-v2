import json

filedata = open("commands.dat", "r")
filedataread = filedata.readlines()
filedata.close()

outfile = open("events.dat", "w")

for f in filedataread:
    outfile.write(json.dumps(f[f.find('\'message\':') + 11:f.find(', \'messagedir\'')]))

outfile.close()