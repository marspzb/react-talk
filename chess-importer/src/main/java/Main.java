import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;

import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;

public class Main {

    private static final class Move {

        String white;
        String black;
    }

    public static void main(final String[] args) throws IOException {
        OrientGraph graph = new OrientGraph("remote:/localhost/chess",
            "admin", "admin");
        System.out.println("Started");
        File playsDirectory = new File(Main.class.getResource("plays").getFile());
        int plays = 0;
        for (File f : playsDirectory.listFiles()) {
            System.out.println("file " + f.getAbsolutePath());
            BufferedReader br = new BufferedReader(new FileReader(f));
            String line = null;
            Map<String, String> playMetadata = new HashMap<String, String>();
            ArrayList<Move> moves = new ArrayList<Move>();
            String result = "";

            boolean readingMetadata = true;

            while ((line = br.readLine()) != null) {
                if (line.startsWith("[")) {
                    if (!readingMetadata) {
                        Main.proccessPlay(graph, playMetadata, moves, result);
                        plays++;
                        playMetadata.clear();
                        moves.clear();
                        readingMetadata = true;
                    }
                    line = line.replace("\"", "");
                    String[] metadata = line.split(" ");
                    String content = line.substring(line.indexOf(' ') + 1, line.length() - 1);
                    playMetadata.put(metadata[0].substring(1, metadata[00].length()),
                        content);

                } else {
                    readingMetadata = false;
                    String[] lineMoves = StringUtils.split(line, '.');
                    for (String lineMove : lineMoves) {
                        String[] moveParts = lineMove.split(" ");
                        if (moveParts.length >= 2) {
                            Move m = new Move();
                            m.white = moveParts[0];
                            m.black = moveParts[1];
                            moves.add(m);
                            if ((moveParts.length > 2) && StringUtils.isNotBlank(moveParts[2])) {
                                result = moveParts[2];
                            }
                        } else {
                            result = moveParts[0];
                        }

                    }

                }
            }
            System.out.println(plays);
            graph.commit();
        }

    }

    private static void proccessPlay(final OrientGraph graph,
            final Map<String, String> playMetadata,
            final ArrayList<Move> moves,
            final String result) {

        Vertex gameVertex = graph.addVertex("class:Game");
        for (Entry<String, String> metadataEntry : playMetadata.entrySet()) {
            gameVertex.setProperty(metadataEntry.getKey(), metadataEntry.getValue());
        }

        Vertex aperture = Main.getMoveApertureById(graph, playMetadata.get("ECO"));
        aperture.addEdge("played", gameVertex);

        //playVertex.setProperty("result", result);

        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < moves.size(); i++) {
            sb.append(moves.get(i).white);
            sb.append(",");
            sb.append(moves.get(i).black);
            String vertexId = sb.toString();
            if (i < 4) {
                Vertex v = Main.getMoveVertexById(graph, vertexId);
                v.addEdge("contains", gameVertex);
            }
        }
        gameVertex.setProperty("gameRecord", sb.toString());
        //System.out.println("Add");
        graph.commit();
    }

    private static Vertex getMoveApertureById(final OrientGraph graph, final String aperture) {
        Vertex v = graph.getVertexByKey("Opening.ecoId", aperture);
        if (v == null) {
            v = graph.addVertex("class:Opening");
            v.setProperty("ecoId", aperture);

        }
        return v;
    }

    private static Vertex getMoveVertexById(final OrientGraph graph, final String vertexId) {
        Vertex v = graph.getVertexByKey("Move.moveId", vertexId);
        if (v == null) {
            v = graph.addVertex("class:Move");
            v.setProperty("moveId", vertexId);

        }
        return v;
    }

}
