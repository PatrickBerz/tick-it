import * as fs from 'fs';

export function serialize<T>(objects: Set<T>, destinationFileName: string): void { //Turn a set of objects and turn them into a json file, stored at the given destinationFileName.
    fs.writeFile(destinationFileName, '{ "objects": [', function(err) {if (err) console.error(err)});
    for (let object of objects) {
        const v = JSON.stringify(object);
        fs.writeFile(destinationFileName, v, {flag: 'a'}, function(err) {if (err) console.error(err)});
        fs.writeFile(destinationFileName, ',', {flag: 'a'}, function(err) {if (err) console.error(err)});
    }
    fs.writeFile(destinationFileName, ']}', {flag: 'a'}, function(err) {if (err) console.error(err)});
}

export function deserialize<T>(fileName: string): Set<T> { //Take the name of a json file, turn it into a set of objects and return that set.
    var collection = new Set<T>();
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        console.log(data);
        const objects = JSON.parse(data);
        for (let object of objects) {
            const v = object as T;
            collection.add(v);
        }
      } catch (err) {
        console.error(err);
      }
    return collection;
}

//function serializePurchases(purchases: Collections.Set<Purchase>){} - serialize<Purchase>
//function serializeShows(shows: Collections.Set<Show>){} - serialize<Show>
//function deserializeVenue(fileName: String){} - deserialize<SeatSection>
//function deserializePurchases(fileName: String){} - deserialize<Purchase>
//function deserializeSeasonHolders(fileName: String){} - deserialize<SeasonTicketHolder>