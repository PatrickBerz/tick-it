import * as fs from 'fs';

function serialize<T>(objects: Set<T>, destinationFileName: string) { //Turn a set of objects and turn them into a json file, stored at the given destinationFileName.
    fs.writeFile(destinationFileName, '{ "objects": [', function(err) {if (err) console.error(err)});
    for (let object of objects) {
        const v = JSON.stringify(object);
        fs.writeFile(destinationFileName, v, {flag: 'a'}, function(err) {if (err) console.error(err)});
        fs.writeFile(destinationFileName, ',', {flag: 'a'}, function(err) {if (err) console.error(err)});
    }
    fs.writeFile(destinationFileName, ']}', {flag: 'a'}, function(err) {if (err) console.error(err)});
}

function deserialize<T>(fileName: string) { //Take the name of a json file, turn it into a set of objects and return that set.
    const objects = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    var collection = new Set<T>();
    for (let object of objects) {
        const v = object as T;
        collection.add(v);
    }
    return collection;
}

//function serializePurchases(purchases: Collections.Set<Purchase>){} - serialize<Purchase>
//function serializeShows(shows: Collections.Set<Show>){} - serialize<Show>
//function deserializeVenue(fileName: String){} - deserialize<SeatSection>
//function deserializePurchases(fileName: String){} - deserialize<Purchase>
//function deserializeSeasonHolders(fileName: String){} - deserialize<SeasonTicketHolder>
