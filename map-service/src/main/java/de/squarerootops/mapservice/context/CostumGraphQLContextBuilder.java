package de.squarerootops.mapservice.context;

import graphql.kickstart.execution.context.GraphQLContext;
import graphql.kickstart.servlet.context.DefaultGraphQLServletContext;
import graphql.kickstart.servlet.context.GraphQLServletContextBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.Session;
import javax.websocket.server.HandshakeRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CostumGraphQLContextBuilder implements GraphQLServletContextBuilder {

  @Override
  public GraphQLContext build(HttpServletRequest httpServletRequest,
      HttpServletResponse httpServletResponse) {

    String user_id = httpServletRequest.getHeader("user_id");
    DefaultGraphQLServletContext context = DefaultGraphQLServletContext.createServletContext()
        .with(httpServletRequest)
        .with(httpServletResponse)
        .build();
    return new CustomGraphQLContext(user_id, context);
  }

  @Override
  public GraphQLContext build(Session session, HandshakeRequest handshakeRequest) {
    throw new IllegalStateException("Unsupported");
  }

  @Override
  public GraphQLContext build() {
    throw new IllegalStateException("Unsupported");
  }
}
